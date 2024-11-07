import { Api, ApiListResponse } from '../components/base/api'; 
import { OrderInput, OrderOutcome, ProductDetails } from '../types';

export interface ProductAPI {
    getAllProducts: () => Promise<ProductDetails[]>;
    getSingleProduct: (productId: string) => Promise<ProductDetails>;
    createOrder: (orderData: OrderInput) => Promise<OrderOutcome>;
}

export class ProductAPIService extends Api implements ProductAPI {
    private readonly contentDeliveryBase: string;

    constructor(cdnUrl: string, baseApiUrl: string, requestOptions?: RequestInit) {
        super(baseApiUrl, requestOptions);
        this.contentDeliveryBase = cdnUrl;
    }

    getSingleProduct(productId: string): Promise<ProductDetails> {
        return this.get(`/product/${productId}`).then((productData: ProductDetails) => ({
            ...productData,
            image: this.contentDeliveryBase + productData.image,
        }));
    }

    getAllProducts(): Promise<ProductDetails[]> {
        return this.get('/product').then((response: ApiListResponse<ProductDetails>) => {
            return response.items.map(item => ({
                ...item,
                image: this.contentDeliveryBase + item.image,
            }));
        });
    }

    createOrder(orderData: OrderInput): Promise<OrderOutcome> {
        return this.post('/order', orderData).then((response: OrderOutcome) => response);
    }
}