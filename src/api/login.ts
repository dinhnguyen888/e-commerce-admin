import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const API_URL = "/api/";

export async function adminLogin(email: string, password: string) {
    try {
        const url = `${API_URL}Auth/admin-login?email=${email}&password=${password}`;
        const response = await axios.post(url);

        if (response.status === 200) {
            const { accessToken, refreshToken } = response.data;
            const setTokens = useAuthStore.getState().setTokens;
            setTokens(accessToken, refreshToken);
            return { accessToken, refreshToken };
        } else {
            throw new Error("Invalid username or password.");
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new Error("Unauthorized access.");
        } else {
            throw new Error("Internal server error.");
        }
    }
}
