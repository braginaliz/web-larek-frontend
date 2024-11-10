import './scss/styles.scss';
import { LarekAPI } from './components/common/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { InterOrder, InterProduct, OrderForm } from './types';
import { ProductCard } from './components/ProductCard';
import { Modal } from './components/common/Modal';
import { EventEmitter } from './components/base/events';
import { AppData } from './components/AppData';
import { Page } from './components/Page';
import { ShoppingBasket } from './components/common/ShoppingBasket';
import { Success } from './components/common/Succes';
import { Order } from './components/Order';
import { Contact } from './components/Contact';

const api = new LarekAPI(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const events = new EventEmitter();
const appData = new AppData(events);
const modal = new Modal(events, ensureElement<HTMLElement>('#modal-container'));
const page = new Page(document.body, events);
const basket = new ShoppingBasket(events);
const orderForm = new Order(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#order')));
const contactsForm = new Contact(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')));

// Event handlers
events.on('contacts:submit', () => {
    api.orderProducts(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), {
                onClick: () => {
                    modal.close();
                    appData.clearBasket();
                }
            });

            modal.render({
                content: success.render(result)
            });
        })
        .catch(err => {
            console.error(err);
        });
});

// Оформить заказ
events.on('order:open', () => {
    modal.render({
      content: orderForm.render(
        {
            payment:'card',
          address: '',
          valid: false,
          errors: []
        }
      ),
    });
  });

events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({
            email: '',
            phone: '',
            valid: false,
            errors: [] 
        })
    });
});

events.on('order:ready', (order: InterOrder) => {
    contactsForm.valid = true; 
});

events.on(/^order\..*:change/, (data: { field: keyof OrderForm; value: string }) => {
    appData.setOrderField(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof OrderForm; value: string }) => {
    appData.setOrderField(data.field, data.value);
});

events.on('formErrors:change', (errors: Partial<OrderForm>) => {
    const { payment, address, email, phone } = errors;
    orderForm.valid = !payment && !address; 
    orderForm.errors = Object.values({payment,address}).filter(i => !!i).join('; ');
    contactsForm.errors = Object.values({email,phone}).filter(i => !!i).join('; ');
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    });
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

events.on('card:select', (item: InterProduct) => {
    appData.setPreview(item);
});

events.on('items:change', (items: InterProduct[]) => {
    page.store = items.map(item => {
        const card = new ProductCard(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render(item);
    });
});

events.on('basket:change', () => {
    page.counter = appData.basket.items.length;

    basket.items = appData.basket.items.map(id => {
        const item = appData.items.find(item => item.id === id);
        const card = new ProductCard(cloneTemplate(cardBasketTemplate), {
            onClick: () => appData.removeFromBasket(item!)
        });
        return card.render(item!); 
    });

    basket.total = appData.basket.total;
});

events.on('preview:change', (item: InterProduct | null) => { 
    if (item) {
        const card = new ProductCard(cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                if (appData.inBasket(item)) {
                    appData.removeFromBasket(item);
                    card.button = 'В корзину';
                } else {
                    appData.addToBasket(item);
                    card.button = 'Удалить из корзины';
                }
            }
        });

        card.button = appData.inBasket(item) ? 'Удалить из корзины' : 'В корзину';

        modal.render({
            content: card.render(item)
        });
    } else {
        modal.close();
    }
});

api.getProductList()
    .then(appData.setItems.bind(appData))
    .catch(err => {
        console.error(err);
    });