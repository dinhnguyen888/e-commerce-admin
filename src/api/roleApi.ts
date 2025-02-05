import axios from "axios";
import { Role, RolePostDto, RoleUpdateDto } from "../entities/role";
import { getAccessToken } from "../store/useAuthStore";

const BASE_URL = "http://174.138.22.1/api";

const getAuthHeaders = () => {
    const token = getAccessToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getAllRoles = async (): Promise<Role[]> => {
    const response = await axios.get(`${BASE_URL}/Role`, getAuthHeaders());
    return response.data;
};

export const createRole = async (role: RolePostDto): Promise<Role> => {
    const response = await axios.post(
        `${BASE_URL}/Role`,
        role,
        getAuthHeaders()
    );
    return response.data;
};

export const updateRole = async (
    id: number,
    role: RoleUpdateDto
): Promise<Role> => {
    const response = await axios.put(
        `${BASE_URL}/Role/${id}`,
        role,
        getAuthHeaders()
    );
    return response.data;
};

export const deleteRole = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/Role/${id}`, getAuthHeaders());
};
