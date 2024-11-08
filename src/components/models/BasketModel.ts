import { ProductDetails, ShoppingBasket } from "../../types";
import { IEvents } from "../base/events";

class BasketModel {
    private basket: ShoppingBasket = { items: [], total: 0 };
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addToBasket(item: ProductDetails) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    removeFromBasket(id: string, price: number) {
        const index = this.basket.items.indexOf(id);
        if (index > -1) {
            this.basket.items.splice(index, 1);
            this.basket.total -= price;
            this.events.emit('basket:change', this.basket);
        }
    }

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:change', this.basket);
    }

    getBasket() {
        return this.basket;
    }
}

export default BasketModel;