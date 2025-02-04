import axios from "axios";
import { Payment, PaymentPostDto, PaymentUpdateDto } from "../entities/payment";
import { getAccessToken } from "../store/useAuthStore";

const API_URL = "https://localhost:7202/api/Payment";

export const getAllPayments = async (): Promise<Payment[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<Payment[]>(API_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const getPaymentsByAccountId = async (
    accountId: string
): Promise<Payment[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<Payment[]>(
        `${API_URL}/account/${accountId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};

export const createPayment = async (
    paymentDto: PaymentPostDto
): Promise<Payment> => {
    const accessToken = getAccessToken();
    const response = await axios.post<Payment>(API_URL, paymentDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const updatePayment = async (
    id: string,
    paymentDto: PaymentUpdateDto
): Promise<Payment> => {
    const accessToken = getAccessToken();
    const response = await axios.put<Payment>(`${API_URL}/${id}`, paymentDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const deletePayment = async (id: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const deletePendingPayment = async (): Promise<boolean> => {
    const accessToken = getAccessToken();
    try {
        await axios.delete(`${API_URL}/pending-payment`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return true;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return false;
        }
        throw error;
    }
};
