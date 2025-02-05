import React, { useEffect, useState } from "react";
import { Card, Tabs, message } from "antd";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../api/categoryApi";
import {
    getAllBanners,
    createBanner,
    updateBanner,
    deleteBanner,
} from "../api/bannerApi";
import {
    Category,
    CategoryPostDto,
    CategoryUpdateDto,
} from "../entities/category";
import { Banner, BannerPostDto, BannerUpdateDto } from "../entities/banner";
import CategoryManagement from "../components/CategoryManagement";
import BannerManagement from "../components/BannerManagement";

const CMSPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchBanners();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            message.error("Không thể lấy danh mục");
        }
    };

    const fetchBanners = async () => {
        try {
            const data = await getAllBanners();
            setBanners(data);
        } catch (error) {
            message.error("Không thể lấy biểu ngữ");
        }
    };

    const handleAddCategory = async (values: CategoryPostDto) => {
        try {
            const newCategory = await createCategory(values);
            setCategories([...categories, newCategory]);
            message.success("Thêm danh mục thành công");
        } catch (error) {
            message.error("Không thể thêm danh mục");
        }
    };

    const handleUpdateCategory = async (
        id: string,
        values: CategoryUpdateDto
    ) => {
        try {
            const updatedCategory = await updateCategory(id, values);
            setCategories(
                categories.map((category) =>
                    category.id === id ? updatedCategory : category
                )
            );
            message.success("Cập nhật danh mục thành công");
        } catch (error) {
            message.error("Không thể cập nhật danh mục");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter((category) => category.id !== id));
            message.success("Xóa danh mục thành công");
        } catch (error) {
            message.error("Không thể xóa danh mục");
        }
    };

    const handleAddBanner = async (values: BannerPostDto) => {
        try {
            const newBanner = await createBanner(values);
            setBanners([...banners, newBanner]);
            message.success("Thêm biểu ngữ thành công");
        } catch (error) {
            message.error("Không thể thêm biểu ngữ");
        }
    };

    const handleUpdateBanner = async (id: string, values: BannerUpdateDto) => {
        try {
            const updatedBanner = await updateBanner(id, values);
            setBanners(
                banners.map((banner) =>
                    banner.id === id ? updatedBanner : banner
                )
            );
            message.success("Cập nhật biểu ngữ thành công");
        } catch (error) {
            message.error("Không thể cập nhật biểu ngữ");
        }
    };

    const handleDeleteBanner = async (id: string) => {
        try {
            await deleteBanner(id);
            setBanners(banners.filter((banner) => banner.id !== id));
            message.success("Xóa biểu ngữ thành công");
        } catch (error) {
            message.error("Không thể xóa biểu ngữ");
        }
    };

    const items = [
        {
            key: "categories",
            label: "Danh mục",
            children: (
                <CategoryManagement
                    categories={categories}
                    onAddCategory={handleAddCategory}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}
                />
            ),
        },
        {
            key: "banners",
            label: "Banner Trang chủ",
            children: (
                <BannerManagement
                    banners={banners}
                    onAddBanner={handleAddBanner}
                    onUpdateBanner={handleUpdateBanner}
                    onDeleteBanner={handleDeleteBanner}
                />
            ),
        },
    ];

    return (
        <div className="p-6">
            <Card>
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Quản lý nội dung</h1>
                </div>
                <Tabs items={items} />
            </Card>
        </div>
    );
};

export default CMSPage;
