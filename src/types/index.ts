export type PaymentMethod = 'cash' | 'card';

export interface InterBasket {
    items: string[]; // массив строк для идентификаторов товаров
    total: number;    // общая сумма
}

export interface InterOrder {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]; // массив строк для идентификаторов товаров
}

export interface InterProduct {
    id: string;
    name: string;
    price: number | null;
    description: string;
    category: string;
    image: string;
}
export type OrderForm = Omit<InterOrder, 'total' | 'items'>;

export interface InterOrderResult {
    id: string;
    total: number;
}