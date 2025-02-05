import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Tag, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../components/modals/product/AddProductModal";
import DeleteProductModal from "../components/modals/product/DeleteProductModal";
import { getAllProducts, deleteProduct } from "../api/productApi";
import { ProductGetDto } from "../entities/product";

const { Search } = Input;

const ProductPage: React.FC = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState<ProductGetDto | null>(null);
    const [products, setProducts] = useState<ProductGetDto[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getAllProducts(page, pageSize);
                if (Array.isArray(data)) {
                    setProducts(data);
                    console.log("Sản phẩm:", data);
                } else {
                    console.error("Expected an array but got:", data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, pageSize]);

    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            await deleteProduct(selectedProduct.id);
            setProducts((prevProducts) =>
                prevProducts.filter((p) => p.id !== selectedProduct.id)
            );
            setIsDeleteModalVisible(false);
            setSelectedProduct(null);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Hình ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl: string) => (
                <img
                    src={imageUrl}
                    alt="product"
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "title",
            ellipsis: true,
            key: "title",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
            render: (description: string) => <p>{description}</p>,
        },
        {
            title: "Tag",
            dataIndex: "tag",
            key: "tag",
            render: (tag: string) => (
                <Tag color="geekblue" key={tag}>
                    {tag}
                </Tag>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",

            render: (createdAt: Date) =>
                new Date(createdAt).toLocaleDateString(),
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (_: any, record: ProductGetDto) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            navigate(`/edit-product/${record.id}`);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedProduct(record);
                            setIsDeleteModalVisible(true);
                        }}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <Card>
                <div className="flex justify-between mb-4">
                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/add-product")}
                    >
                        Thêm sản phẩm
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                    loading={loading}
                />
            </Card>

            <AddProductModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={(values) => {
                    console.log("Thêm sản phẩm:", values);
                    setIsAddModalVisible(false);
                }}
            />

            <DeleteProductModal
                visible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                onConfirm={handleDeleteProduct}
                selectedProduct={selectedProduct as { id: string }}
            />
        </div>
    );
};

export default ProductPage;
