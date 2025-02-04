export interface Payment {
    id: string;
    productPay: string;
    productId: string;
    userId: string;
    paymentGateway: string;
    productPrice: number;
    paymentDate: string;
    paymentStatus: boolean;
}

export interface PaymentPostDto {
    productPay: string;
    productId: string;
    userId: string;
    paymentGateway: string;
    productPrice: number;
}

export interface PaymentUpdateDto {
    productPay?: string;
    userId?: string;
    paymentGateway?: string;
    productPrice?: number;
    paymentDate?: string;
}
