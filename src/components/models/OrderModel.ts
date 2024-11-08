import { OrderDetails, OrderInput} from "../../types";
import { PaymentTypes } from "../../types";
import { ShoppingBasket } from "../../types";
import { IEvents } from "../base/events";

class OrderModel {
    private order: OrderDetails = {
        payment: 'card',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    };
    private basket: ShoppingBasket = { items: [], total: 0 };
    private events: IEvents;
    formErrors: Partial<Record<keyof OrderInput, string>> ={};

    constructor(events: IEvents) {
        this.events = events;
    }

    setOrderDetails(details: Partial<OrderInput>) {
        this.order = { ...this.order, ...details };

        if (this.order.payment && this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', errors);
        return Object.keys(errors).length === 0;
    }

    setPaymentTypes(method: PaymentTypes) {
        this.order.payment = method;
    }

    setOrderField (field: keyof OrderInput, value: string){
        if (field === 'payment') {
            this.setPaymentTypes(value as PaymentTypes);

        } else {
            this.order[field] = value;
        }
        if (this.order.payment && this.validateOrder()) {
            this.order.total = this.basket.total;
            this.order.items = this.basket.items;
            this.events.emit('order:ready', this.order);
        }
    }

    getOrder() {
        return this.order;
    }
}

export default OrderModel;