# Проект "Веб-ларёк" 

 

## Оглавление 

1. [Запуск](#Запуск) 

2. [Сборка](#Сборка) 

3. [Описание](#Описание) 

4. [Скриншоты](#Скриншоты) 

5. [Документация](#Документация) 

6. [Автор](#Автор) 

7. [Благодарности](#Благодарности) 

 

## Запуск 

Чтобы установить и запустить проект, выполните следующие команды: 

 

```bash 

npm install 

npm run start 

``` 

или 

 

```bash 

yarn install 

yarn start 

``` 

 

## Сборка 

Для сборки проекта используйте: 

 

```bash 

npm run build 

``` 

или 

 

```bash 

yarn build 

``` 

 

## Описание 

Проект представляет собой онлайн-магазин, в котором веб-разработчики могут найти необходимые товары и инструменты. В проекте реализован подход MVP (Model-View-Presenter), что обеспечивает ясное разделение обязанностей между классами Model и View, предоставляя каждой из них четко определенную роль: 

 

- **Model** — отвечает за загрузку данных через API, а также за сохранение и обработку данных, получаемых от пользователя. 

- **View** — предназначен для отображения интерфейса, с которым взаимодействует пользователь, фиксируя события, происходящие в системе, и передавая их дальше. 

- **EventEmitter** выполняет функции Представителя (Presenter), связывающего модели данных с визуальными компонентами интерфейса. Он управляет взаимодействием между ними, инициируя связь при возникновении различных событий. Например, при выборе карточки товара будет генерироваться событие `'card:select'`, на которое могут подписываться другие компоненты, такие как корзина или страница товара, чтобы обновить свой статус в ответ на действия пользователя. 

 

### Технологический стек 

- HTML 

- SCSS 

- TypeScript 

- Webpack 

 

### Структура проекта 

- **src/** — исходные файлы проекта 

- **src/components/** — папка для компонентов 

- **src/components/base/** — базовые компоненты 

 

### Важные файлы 

- `src/pages/index.html` — основной HTML-файл 

- `src/types/index.ts` — файл с определениями типов 

- `src/index.ts` — точка входа приложения 

- `src/styles/styles.scss` — корневой файл стилей 

- `src/utils/constants.ts` — константы 

- `src/utils/utils.ts` — утилиты 

 

## Скриншоты 

![Снимок экрана 2024-10-21 в 19 33 26](https://github.com/user-attachments/assets/91f5a37f-ef84-478f-a366-ac1aef611032) 

![Снимок экрана 2024-10-21 в 19 33 16](https://github.com/user-attachments/assets/5b23fca9-8eb7-4458-92c7-4dbb80b6bc6c) 

 

## Документация 

 

### Архитектура проекта 

 

#### 1. Структура классов проекта 

 

**Слой Model** 

- **ProductModel**: Управляет данными о товарах. Включает методы для получения, добавления и удаления товаров. 

- **BasketModel**: Управляет данными о товарах в корзине. Методы для добавления, удаления и расчета общей стоимости корзины. 

- **OrderModel**: Обрабатывает информацию о заказах, включая подтверждение и детали заказа. 

 

**Слой View** 

- **MainView**: Отображает главную страницу с галереей товаров и счётчиком товаров в корзине. 

- **Modal**: Универсальный контейнер для отображения модальных окон. Включает методы для открытия и закрытия окна, а также рендеринга контента. 

- **ProductCardView**: Отображает карточку товара. Использует шаблон для отображения информации о товаре. 

- **BasketView**: Отображает содержимое корзины. Использует шаблон для отображения списка товаров в корзине. 

- **OrderView**: Отображает формы для заполнения данных заказчика и способа оплаты. 

- **SuccessView**: Отображает сообщение об успешном оформлении заказа. 

 

**Слой Presenter** 

- **MainPresenter**: Подключает MainView к ProductModel и BasketModel. Отвечает за отображение данных на главной странице. 

- **ModalPresenter**: Управляет взаимодействием между Modal и соответствующими моделями данных. Обрабатывает открытие различных модальных окон. 

- **ProductCardPresenter**: Управляет данными о товаре и взаимодействием в ProductCardView. 

- **BasketPresenter**: Управляет взаимодействием с корзиной, передаёт данные в BasketView. 

- **OrderPresenter**: Устанавливает связь между данными заказа и OrderView. 

 

#### 2. Взаимодействие классов 

 

Каждый слой взаимодействует по следующей схеме: 

 

1. **View** (MainView, BasketView и т.д.) генерирует события на определенные действия пользователя (например, нажатие кнопки "В корзину"). 

2. **Presenter** (MainPresenter, BasketPresenter) обрабатывает это событие, взаимодействуя с **Model**. 

3. **Model** (ProductModel, BasketModel) предоставляет необходимые данные, а **Presenter** обновляет **View** с помощью методов рендеринга. 

 

#### 3. Определение основных классов 

 

**Слой Model** 

 

```javascript 

class ProductModel { 

    constructor() { 

        this.products = []; // массив товаров 

    } 

 

    fetchProducts() { 

        // Реализация получения данных о товарах 

    } 

 

    addProduct(product) { 

        // Добавление товара в массив 

    } 

 

    removeProduct(productId) { 

        // Удаление товара из массива 

    } 

} 

 

class BasketModel { 

    constructor() { 

        this.basket = []; // массив товаров в корзине 

    } 

 

    addToBasket(product) { 

        // Добавление товара в корзину 

    } 

 

    removeFromBasket(productId) { 

        // Удаление товара из корзины 

    } 

 

    getTotal() { 

        // Подсчёт общей стоимости товаров в корзине 

    } 

} 

 

class OrderModel { 

    constructor() { 

        this.orderDetails = {}; // детали заказа 

    } 

 

    confirmOrder(orderDetails) { 

        // Подтверждение заказа 

    } 

} 

``` 

 

**Слой View** 

 

```javascript 

class MainView { 

    constructor() { 

        // Селекторы элементов HTML 

        this.basketButton = document.querySelector('.header__basket'); 

        this.galleryElement = document.querySelector('.gallery'); 

    } 

 

    renderProducts(products) { 

        // Отображение списка товаров на главной странице 

    } 

 

    updateBasketCounter(count) { 

        document.querySelector('.header__basket-counter').textContent = count; 

    } 

} 

 

class Modal { 

    constructor() { 

        this.modalContainer = document.getElementById('modal-container'); 

    } 

 

    open(content) { 

        this.modalContainer.querySelector('.modal__content').innerHTML = content; 

        this.modalContainer.classList.add('modal_active'); 

    } 

 

    close() { 

        this.modalContainer.classList.remove('modal_active'); 

        this.clear(); 

    } 

 

    clear() { 

        this.modalContainer.querySelector('.modal__content').innerHTML = ''; 

    } 

} 

 

class ProductCardView { 

    constructor(template) { 

        this.template = template; // шаблон карточки 

    } 

 

    render(product) { 

        // Подготовка и рендеринг карточки товара 

    } 

} 

 

class BasketView { 

    constructor() { 

        this.basketList = document.querySelector('.basket__list'); 

    } 

 

    renderBasketItems(items) { 

        // Отображение товаров в корзине 

    } 

} 

 

class OrderView { 

    // Отображение форм для оформления заказа 

} 

 

class SuccessView { 

    // Отображение успеха оформления заказа 

} 

``` 

 

**Слой Presenter** 

 

```javascript 

class MainPresenter { 

    constructor(mainView, productModel, basketModel) { 

        this.mainView = mainView; 

        this.productModel = productModel; 

        this.basketModel = basketModel; 

 

        // Связываем события 

        this.mainView.basketButton.addEventListener('click', () => this.showBasket());
        this.loadProducts(); 

    } 

 

    loadProducts() { 

        const products = this.productModel.fetchProducts(); 

        this.mainView.renderProducts(products); 

    } 

 

    showBasket() { 

        // Отображение корзины 

    } 

} 

 

class ModalPresenter { 

    constructor(modal, basketModel) { 

        this.modal = modal; 

        this.basketModel = basketModel; 

 

        // события для открытия/закрытия модальных окон 

    } 

} 

 

class ProductCardPresenter { 

    constructor(productCardView, productModel) { 

        this.productCardView = productCardView; 

        this.productModel = productModel; 

    } 

 

    // Обработка событий карточки товара 

} 

 

class BasketPresenter { 

    constructor(basketView, basketModel) { 

        this.basketView = basketView; 

        this.basketModel = basketModel; 

    } 

 

    // Обработка событий корзины 

} 

 

class OrderPresenter { 

    constructor(orderView, orderModel) { 

        this.orderView = orderView; 

        this.orderModel = orderModel; 

    } 

 

    // Обработка событий оформления заказа 

} 

``` 

 

### 4. Пример использования 

 

В основном файле (main.js): 

 

```javascript 

document.addEventListener('DOMContentLoaded', () => { 

    // Создание экземпляров модели и представлений 

    const productModel = new ProductModel(); 

    const basketModel = new BasketModel(); 

 

    const mainView = new MainView(); 

    const modal = new Modal(); 

 

    const mainPresenter = new MainPresenter(mainView, productModel, basketModel); 

    const modalPresenter = new ModalPresenter(modal, basketModel); 

}); 

``` 

 

## Автор 

*Брагина Елизавета* 

 

## Благодарности 

*Я хочу поблагодарить Бейонсе за предоставленную возможность.* 

 
