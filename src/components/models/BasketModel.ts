import { ShoppingBasket } from "../../types";
import { IEvents } from "../base/events";

class BasketModel {
    private basket: ShoppingBasket = { items: [], totalPrice: 0 };
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addToBasket(itemId: string, itemPrice: number) {
        this.basket.items.push(itemId);
        this.basket.totalPrice += itemPrice;
        this.events.emit('basket:change', this.basket);
    }

    removeFromBasket(itemId: string, itemPrice: number) {
        const index = this.basket.items.indexOf(itemId);
        if (index > -1) {
            this.basket.items.splice(index, 1);
            this.basket.totalPrice -= itemPrice;
            this.events.emit('basket:change', this.basket);
        }
    }

    clearBasket() {
        this.basket.items = [];
        this.basket.totalPrice = 0;
        this.events.emit('basket:change', this.basket);
    }

    getBasket() {
        return this.basket;
    }
}

export default BasketModel;