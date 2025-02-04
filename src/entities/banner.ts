export interface Banner {
    id: string;
    bannerName: string;
    bannerUrl: string;
}

export interface BannerPostDto {
    bannerName: string;
    bannerUrl: string;
}

export interface BannerUpdateDto {
    bannerName: string;
    bannerUrl: string;
}
