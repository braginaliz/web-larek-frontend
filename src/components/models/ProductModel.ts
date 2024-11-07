import { PaymentTypes, ProductDetails } from "../../types";
import { IEvents } from "../base/events";

class ProductModel {
    private products: ProductDetails[] = [];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(items: ProductDetails[]) {
        this.products = items;
        this.events.emit('products:change', this.products);
    }

    getProducts() {
        return this.products;
    }
    
}

export default ProductModel;