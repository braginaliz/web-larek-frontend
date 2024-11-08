import { ProductAPIService } from './components/API';
import {ApiListResponse} from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { OrderInput, OrderDetails, ProductDetails} from './types';
import { ProductCardPresenter } from './components/presenters/ProductCardPresenter';
import { ModalPresenter } from './components/presenters/ModalPresenter';
import { EventEmitter } from './components/base/events';
import BasketModel from './components/models/BasketModel';
import OrderModel from './components/models/OrderModel';
import ProductModel from './components/models/ProductModel'; 
import { BasketViewer } from './components/views/BasketViewer';
import { ContactsViewer } from './components/views/ContactsViewer';
import { OrderComplViewer } from './components/views/OrderComplViewer';
import { PageViewer } from './components/views/PageViewer';
import { PaymentViewer } from './components/views/PaymentViewer';

const api = new ProductAPIService(CDN_URL, API_URL);
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// Создание моделей
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);
const productModel = new ProductModel(events);

// Создание экземпляров вью
const modal = new ModalPresenter(events, ensureElement<HTMLTemplateElement>('#modal-container'));
const page = new PageViewer(document.body, events);
const basket = new BasketViewer(events);
const orderDetails = new PaymentViewer(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#order')));
const contactsForm = new ContactsViewer(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts'))); 

// Получаем лоты с сервера
api.getAllProducts()
  .then((res: ProductDetails[]) => {
    productModel.setProducts(res);
    page.store = productModel.getProducts().map(item => {
      const productCard = new ProductCardPresenter(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item),
      });
      return productCard.render(item);
    });
  })
  .catch(err => {
    console.error(err);
  });

// Изменения на события
events.on('items:change', () => {
  page.store = productModel.getProducts().map(item => {
    const productCard = new ProductCardPresenter(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return productCard.render(item);
  });
});

// Открытие карточки товара
events.on('card:select', (item: ProductDetails) => {
  page.locked = true;
  const product = new ProductCardPresenter(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      events.emit('card:toBasket', item);
    },
  });
  modal.render({
    content: product.render(item),
  });
});


// Добавление товара в корзину
events.on('card:toBasket', (item: ProductDetails) => {
  if (!basketModel.inBasket(item)) {
    basketModel.addToBasket(item);
    page.counter = basketModel.getBasket().items.length;
    modal.close();
  }
});

// Оформление заказа
events.on('basket:order', () => {
  modal.render({
    content: orderDetails.render({
      address: '',
      valid: false,
      errors: [],
    }),
  });
});

// Валидация заказа
events.on('orderFormErrors:change', (errors: Partial<OrderInput>) => {
  orderDetails.valid = !errors.payment && !errors.address;
  orderDetails.errors = Object.values(errors).filter(Boolean).join('; ');
});

// Валидация контактной информации
events.on('contactsFormErrors:change', (errors: Partial<OrderInput>) => {
  contactsForm.valid = !errors.email && !errors.phone;
  contactsForm.errors = Object.values(errors).filter(Boolean).join('; ');
});



  // Запрос на создание заказа
  api.createOrder(orderModel.getOrder())
    .then((res) => {
      events.emit('order:success', res);
      basketModel.clearBasket();
      page.counter = 0;
    })
    .catch(console.error);
;

// Успешное завершение покупки
events.on('order:success', (res: ApiListResponse<string>) => {
  modal.render({
    content: new OrderComplViewer(cloneTemplate(ensureElement<HTMLTemplateElement>('#order-success')), {
      onClick: () => modal.close(),
    }).render({ total: res.total }),
  });
});
events.on('preview:change', (item: ProductDetails) => {
    if (item) {
        const card = new ProductCardPresenter(cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                if (basketModel.inBasket(item)) {
                    basketModel.removeFromBasket(item);
                    card.button = 'В корзину';
                } else {
                    basketModel.addToBasket(item);
                    card.button = 'Удалить из корзины';
                }
            }
        });

        card.button = basketModel.inBasket(item) ? 'Удалить из корзины' : 'В корзину';

        modal.render({
            content: card.render(item)
        });
    } else {
        modal.close();
    }
});

// Закрытие модального окна
events.on('modal:close', () => {
  page.locked = false;
});

api.getAllProducts()
    .then((res: ProductDetails[]) => {
        productModel.setProducts(res);
    })
    .catch(err => {
        console.error(err);
    });