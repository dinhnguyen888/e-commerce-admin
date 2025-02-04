import axios from "axios";
import { Account, AccountPostDto, AccountUpdateDto } from "../entities/account";

const API_URL = "https://localhost:7202/api/Account";

export const getAllAccounts = async (
    accessToken: string
): Promise<Account[]> => {
    const response = await axios.get<Account[]>(API_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const getAccountById = async (
    id: string,
    accessToken: string | null
): Promise<Account> => {
    const response = await axios.get<Account>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const createAccount = async (
    accountDto: AccountPostDto,
    accessToken: string | null
): Promise<Account> => {
    console.log("Creating account with data:", accountDto);
    const response = await axios.post<Account>(API_URL, accountDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const updateAccount = async (
    id: string,
    accountDto: AccountUpdateDto,
    accessToken: string | null
): Promise<Account> => {
    console.log("Updating account with data:", accountDto);
    const response = await axios.put<Account>(`${API_URL}/${id}`, accountDto, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const deleteAccount = async (
    id: string,
    accessToken: string | null
): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
