import { OrderDetails, OrderInput} from "../../types";
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
    private events: IEvents;

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
        const errors: Record<string, string> = {};
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
        this.events.emit('formErrors:change', errors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return this.order;
    }
}

export default OrderModel;