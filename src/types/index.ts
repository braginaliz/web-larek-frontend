export type PaymentTypes = 'cash' | 'card';

export interface ProductDetails {
    id: string;                  // уникальный идентификатор товара
    name: string;                // наименование товара
    price: number | null;        // цена товара или null
    description: string;         // описание товара
    category: string;            // категория товара
    image: string;               // URL изображения товара
}

export interface OrderDetails {
    payment: PaymentTypes;       // способ оплаты
    email: string;               // email клиента
    phone: string;               // телефон клиента
    address: string;             // адрес доставки
    total: number;               // общая сумма заказа
    items: string[];             // идентификаторы заказанных товаров
}

export interface ShoppingBasket {
    items: string[];             // список идентификаторов товаров
    total: number;               // общая стоимость всех товаров
}

export type OrderInput = Omit<OrderDetails, 'total' | 'items'> & {
    valid: boolean;              // свойство, указывающее на валидность данных
    errors: string[];           // массив ошибок валидации
};

export interface OrderOutcome {
    id: string;                  // идентификатор заказа
    total: number;               // общая сумма заказа
}


