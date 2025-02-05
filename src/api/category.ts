import axios from "axios";
import {
    Category,
    CategoryPostDto,
    CategoryUpdateDto,
} from "../entities/category";
import { getAccessToken } from "../store/useAuthStore";

const API_URL = "/api/Category";

export const getAllCategories = async (): Promise<Category[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<Category[]>(API_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const createCategory = async (
    categoryDto: CategoryPostDto
): Promise<Category> => {
    const accessToken = getAccessToken();
    const response = await axios.post<Category>(API_URL, categoryDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const updateCategory = async (
    id: string,
    categoryDto: CategoryUpdateDto
): Promise<Category> => {
    const accessToken = getAccessToken();
    const response = await axios.put<Category>(
        `${API_URL}/${id}`,
        categoryDto,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
