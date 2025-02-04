import axios from "axios";
import { Banner, BannerPostDto, BannerUpdateDto } from "../entities/banner";
import { getAccessToken } from "../store/useAuthStore";

const API_URL = "https://localhost:7202/api/Banner";

export const getAllBanners = async (): Promise<Banner[]> => {
    const accessToken = getAccessToken();
    const response = await axios.get<Banner[]>(API_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const createBanner = async (
    bannerDto: BannerPostDto
): Promise<Banner> => {
    const accessToken = getAccessToken();
    const response = await axios.post<Banner>(API_URL, bannerDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const updateBanner = async (
    id: string,
    bannerDto: BannerUpdateDto
): Promise<Banner> => {
    const accessToken = getAccessToken();
    const response = await axios.put<Banner>(`${API_URL}/${id}`, bannerDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const deleteBanner = async (id: string): Promise<void> => {
    const accessToken = getAccessToken();
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
