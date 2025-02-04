import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getCartByUserId, removeFromCart, clearCart } from "../api/cart";
import { Cart } from "../entities/cart";

const UserCartPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCartItem, setSelectedCartItem] = useState<Cart | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setLoading(true);
        try {
            if (userId) {
                const data = await getCartByUserId(userId);
                setCartItems(data);
            } else {
                message.error("ID người dùng không xác định");
            }
        } catch (error) {
            message.error("Không thể lấy dữ liệu giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async () => {
        if (selectedCartItem) {
            await removeFromCart(selectedCartItem.id);
            fetchCartItems();
            setIsDeleteModalVisible(false);
            setSelectedCartItem(null);
        }
    };

    const handleClearCart = async () => {
        try {
            if (userId) {
                await clearCart(userId);
            } else {
                message.error("ID người dùng không xác định");
            }
            setCartItems([]);
            message.success("Xóa giỏ hàng thành công");
        } catch (error) {
            message.error("Không thể xóa giỏ hàng");
        }
    };

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Mô tả",
            dataIndex: "productDescription",
            key: "productDescription",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Thêm vào lúc",
            dataIndex: "addToCartAt",
            key: "addToCartAt",
            render: (date: string) => new Date(date).toLocaleString(),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Cart) => (
                <Space>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedCartItem(record);
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
                    <Button
                        onClick={() => navigate("/customers")}
                        type="primary"
                    >
                        Quay lại người dùng
                    </Button>
                    <Button type="primary" onClick={handleClearCart}>
                        Xóa giỏ hàng
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={cartItems}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>
        </div>
    );
};

export default UserCartPage;
