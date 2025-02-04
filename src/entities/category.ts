export interface Category {
    id: string;
    categoryName: string;
    blockName?: string;
    frontendEndpoint: string;
    children?: Category[];
}

export interface CategoryPostDto {
    categoryName: string;
    blockName?: string;
    frontendEndpoint: string;
}

export interface CategoryUpdateDto {
    categoryName: string;
    blockName?: string;
    frontendEndpoint: string;
}
