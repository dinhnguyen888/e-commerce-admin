export interface ProductGetDto {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    tag: string;
    imageUrl: string;
    createdAt: Date;
}

export interface ProductGetDetailDto {
    id: string;
    title: string;
    price: number;
    category: string;
    specification: string;
    tag: string;
    imageUrls: string[];
    description: string;
    descriptionDetail: string;
    createdAt: Date;
}

export interface ProductPostDto {
    title: string;
    description: string;
    descriptionDetail: string;
    tag: string;
    price: number;
    specification: string;
    category: string;
    imageUrls: string[];
    productUrl: string;
}

export interface ProductUpdateDto {
    title?: string;
    description?: string;
    descriptionDetail?: string;
    tag?: string;
    price?: number;
    specification?: string;
    category?: string;
    imageUrls?: string[];
    productUrl?: string;
}

export interface ProductGetForUpdate {
    id: string;
    title?: string;
    description?: string;
    descriptionDetail?: string;
    tag?: string;
    price?: number;
    specification?: string;
    category?: string;
    imageUrls?: string[];
    productUrl?: string;
    createdAt: Date;
}
