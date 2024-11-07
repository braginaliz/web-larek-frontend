// Типы для способов оплаты
export type PaymentTypes = 'cash' | 'card';

// Интерфейс, описывающий структуру товара
export interface ProductDetails {
    id: string;                  // уникальный идентификатор товара
    name: string;                // наименование товара
    price: number | null;        // цена товара или null
    description: string;         // описание товара
    category: string;            // категория товара
    image: string;               // URL изображения товара
}

// Интерфейс заказа
export interface OrderDetails {
    paymentMethod: PaymentTypes; // способ оплаты
    customerEmail: string;       // email клиента
    customerPhone: string;       // телефон клиента
    shippingAddress: string;     // адрес доставки
    totalAmount: number;         // общая сумма заказа
    orderedItems: string[];      // идентификаторы заказанных товаров
}

// Интерфейс для описания корзины покупок
export interface ShoppingBasket {
    items: string[];             // список идентификаторов товаров
    totalPrice: number;          // общая стоимость всех товаров
}

export type OrderInput = Omit<OrderDetails, 'totalAmount' | 'orderedItems'>;

// Интерфейс для результата обработки заказа
export interface OrderOutcome {
    orderId: string;             // идентификатор заказа
    finalAmount: number;         // итоговая сумма
}