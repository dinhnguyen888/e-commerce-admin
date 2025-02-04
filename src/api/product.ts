import axios from "axios";
import {
    ProductPostDto,
    ProductUpdateDto,
    ProductGetDto,
    ProductGetDetailDto,
    ProductGetForUpdate,
} from "../entities/product";
import { getAccessToken } from "../store/useAuthStore";

const API_URL = "https://localhost:7202/api/Products";

export const getAllProducts = async (
    page: number,
    pageSize: number
): Promise<ProductGetDto[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<{ products: ProductGetDto[] }>(
        `${API_URL}?page=${page}&pageSize=${pageSize}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.products;
};

export const getProductById = async (
    id: string
): Promise<ProductGetDetailDto> => {
    const accessToken = getAccessToken();
    const response = await axios.get<ProductGetDetailDto>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const createProduct = async (
    productDto: ProductPostDto
): Promise<ProductGetDetailDto> => {
    const accessToken = getAccessToken();
    const response = await axios.post<ProductGetDetailDto>(
        API_URL,
        productDto,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};

export const updateProduct = async (
    id: string,
    productDto: ProductUpdateDto
): Promise<ProductGetDetailDto> => {
    const accessToken = getAccessToken();
    const response = await axios.put<ProductGetDetailDto>(
        `${API_URL}/${id}`,
        productDto,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getProductForUpdating = async (
    id: string
): Promise<ProductGetForUpdate> => {
    const accessToken = getAccessToken();
    const response = await axios.get<ProductGetForUpdate>(
        `${API_URL}/for-update-product/${id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};
