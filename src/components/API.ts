//API.ts

import { Api, ApiListResponse } from '../components/base/api'; 
import { OrderDetails, OrderOutcome, ProductDetails } from '../types';

export interface ProductAPI {
    getAllProducts: () => Promise<ProductDetails[]>;
    getSingleProduct: (id: string) => Promise<ProductDetails>;
    createOrder: (order: OrderDetails) => Promise<OrderOutcome>;
}

export class ProductAPIService extends Api implements ProductAPI {
    private readonly contentDeliveryBase: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.contentDeliveryBase = cdn;
    }

    getSingleProduct(id: string): Promise<ProductDetails> {
        return this.get(`/product/${id}`).then((data: ProductDetails) => ({
            ...data,
            image: this.contentDeliveryBase + data.image,
        }));
    }

    getAllProducts(): Promise<ProductDetails[]> {
        return this.get('/product').then((data: ApiListResponse<ProductDetails>) => {
            return data.items.map(item => ({
                ...item,
                image: this.contentDeliveryBase + item.image,
            }));
        });
    }

    createOrder(order: OrderDetails): Promise<OrderOutcome> {
        return this.post('/order', order).then((data: OrderOutcome) => data);
    }
}