import { OrderInput, OrderOutcome } from "../../types";
import { IEvents } from "../base/events";

class OrderModel {
    private order: OrderInput = {
        paymentMethod: 'card',
        customerEmail: '',
        customerPhone: '',
        shippingAddress: '',
    };
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setOrderDetails(details: Partial<OrderInput>) {
        this.order = { ...this.order, ...details };

        if (this.order.paymentMethod && this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: Record<string, string> = {};
        if (!this.order.paymentMethod) {
            errors.paymentMethod = 'Необходимо выбрать способ оплаты';
        }
        if (!this.order.customerEmail) {
            errors.customerEmail = 'Необходимо указать email';
        }
        if (!this.order.customerPhone) {
            errors.customerPhone = 'Необходимо указать телефон';
        }
        if (!this.order.shippingAddress) {
            errors.shippingAddress = 'Необходимо указать адрес';
        }
        this.events.emit('formErrors:change', errors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return this.order;
    }
}

export default OrderModel;