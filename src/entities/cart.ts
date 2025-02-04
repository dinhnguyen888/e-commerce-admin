export interface Cart {
    id: string;
    userId: string;
    productName: string;
    productId: string;
    productDescription: string;
    price: number;
    addToCartAt: Date;
}
