import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Tag, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPayments, deletePayment } from "../api/payment";
import { Payment } from "../entities/payment";

const UserPaymentPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
        null
    );
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const data = await getAllPayments();
            setPayments(data.filter((payment) => payment.userId === userId));
        } catch (error) {
            message.error("Failed to fetch payments");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePayment = async () => {
        if (selectedPayment) {
            await deletePayment(selectedPayment.id);
            fetchPayments();
            setIsDeleteModalVisible(false);
            setSelectedPayment(null);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Product Pay",
            dataIndex: "productPay",
            key: "productPay",
        },
        {
            title: "Product ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Payment Gateway",
            dataIndex: "paymentGateway",
            key: "paymentGateway",
        },
        {
            title: "Product Price",
            dataIndex: "productPrice",
            key: "productPrice",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Payment Date",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status: boolean) => (
                <Tag color={status ? "green" : "red"}>
                    {status ? "Completed" : "Pending"}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Payment) => (
                <Space>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedPayment(record);
                            setIsDeleteModalVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <Card>
                <div className="flex justify-between mb-4">
                    <Button onClick={() => navigate("/users")}>
                        Back to Users
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={payments}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>
        </div>
    );
};

export default UserPaymentPage;
