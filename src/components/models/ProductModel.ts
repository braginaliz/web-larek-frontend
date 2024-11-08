import { ProductDetails } from "../../types";
import { IEvents } from "../base/events";

class ProductModel {
    private items: ProductDetails[] = [];
    private preview: ProductDetails = null;
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(items: ProductDetails[]) {
        this.items = items;
        this.events.emit('items:change', this.items);
    }
    setPreview(item: ProductDetails) {
        this.preview = item;
        this.events.emit('preview:change', this.preview);
    }

    getProducts() {
        return this.items;
    }
    
   
}

export default ProductModel;