import axios from "axios";
import { Cart } from "../entities/cart";
import { getAccessToken } from "../store/useAuthStore";

const API_URL = "http://174.138.22.1/api/Cart";

export const getCartByUserId = async (userId: string): Promise<Cart[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<Cart[]>(`${API_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const addToCart = async (cart: Cart): Promise<Cart> => {
    const accessToken = getAccessToken();
    const response = await axios.post<Cart>(API_URL, cart, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const removeFromCart = async (id: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const clearCart = async (userId: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/clear/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
