import {Api, ApiListResponse } from '../../components/base/api';
import { InterOrder, InterOrderResult, InterProduct } from '../../types';

export interface IFilmAPI {
    getProductList(): Promise<InterProduct[]>;
    getProductItem(id: string): Promise<InterProduct>;
    orderProducts(order: InterOrder): Promise<InterOrderResult>;
}

export class LarekAPI extends Api implements IFilmAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<InterProduct> {
        return this.get(`/product/${id}`).then((data: InterProduct) => ({
            ...data,
            image: this.cdn + data.image,
        }));
    }

    getProductList(): Promise<InterProduct[]> {
        return this.get('/product/').then((data: ApiListResponse<InterProduct>) => 
            data.items.map(item => ({
                ...item,
                image: this.cdn + item.image,
            }))
        );
    }

    orderProducts(order: InterOrder): Promise<InterOrderResult> {
        return this.post('/order', order).then((data: InterOrderResult) => data);
    }
}