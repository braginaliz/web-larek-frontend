import { PaymentTypes, ProductDetails } from "../../types";
import { IEvents } from "../base/events";

class ProductModel {
    private items: ProductDetails[] = [];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(items: ProductDetails[]) {
        this.items = items;
        this.events.emit('items:change', this.items);
    }

    getProducts() {
        return this.items;
    }
    
}

export default ProductModel;