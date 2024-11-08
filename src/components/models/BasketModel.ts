//BasketModels.ts 

import { ProductDetails, ShoppingBasket } from "../../types";
import { IEvents } from "../base/events";

class BasketModel {
    private basket: ShoppingBasket = { items: [], total: 0 };
    private events: IEvents;
    constructor(events: IEvents) {
        this.events = events;
    }

    inBasket (item:ProductDetails) {
        return this.basket.items.includes(item.id);
    }

    addToBasket(item: ProductDetails) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    removeFromBasket(item: ProductDetails) {
        const index = this.basket.items.indexOf(item.id);
        if (index > -1) {
            this.basket.items.splice(index, 1);
            this.basket.total -= item.price;
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