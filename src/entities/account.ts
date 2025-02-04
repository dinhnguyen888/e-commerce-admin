export interface Account {
    id: string;
    email: string;
    name: string;
    roleName: string;
}

export interface AccountPostDto {
    email: string;
    password: string;
    name: string;
    roleId?: number;
}

export interface AccountUpdateDto {
    email?: string;
    name?: string;
    password?: string;
    roleId?: string;
}
