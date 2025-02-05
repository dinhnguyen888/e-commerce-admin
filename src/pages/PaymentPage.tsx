import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Tag, Input, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import AddPaymentModal from "../components/modals/payment/AddPaymentModal";
import UpdatePaymentModal from "../components/modals/payment/UpdatePaymentModal";
import DeletePaymentModal from "../components/modals/payment/DeletePaymentModal";
import {
    getAllPayments,
    deletePayment,
    deletePendingPayment,
} from "../api/paymentApi";
import { Payment } from "../entities/payment";

const { Search } = Input;

const PaymentPage: React.FC = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(
        null
    );
    const [payments, setPayments] = useState<Payment[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const data = await getAllPayments();
                setPayments(data);
            } catch (error) {
                message.error("Không thể lấy thông tin thanh toán");
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const handleDeletePayment = async () => {
        if (selectedPayment) {
            await deletePayment(selectedPayment.id);
            const data = await getAllPayments();
            setPayments(data);
            setIsDeleteModalVisible(false);
            setSelectedPayment(null);
        }
    };

    const handleClearPendingPayments = async () => {
        const result = await deletePendingPayment();
        if (result) {
            const data = await getAllPayments();
            setPayments(data);
            message.success("Xóa thanh toán đang chờ thành công.");
        } else {
            message.warning("Không tìm thấy thanh toán đang chờ.");
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredPayments = payments.filter(
        (payment) =>
            payment.productPay
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            payment.userId.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Sản phẩm thanh toán",
            dataIndex: "productPay",
            key: "productPay",
        },
        {
            title: "ID sản phẩm",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "ID người dùng",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Cổng thanh toán",
            dataIndex: "paymentGateway",
            key: "paymentGateway",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "productPrice",
            key: "productPrice",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status: boolean) => (
                <Tag color={status ? "green" : "red"}>
                    {status ? "Hoàn thành" : "Đang chờ"}
                </Tag>
            ),
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (_: any, record: Payment) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setSelectedPayment(record);
                            setIsUpdateModalVisible(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedPayment(record);
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
                        placeholder="Tìm kiếm thanh toán"
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        onSearch={handleSearch}
                    />
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsAddModalVisible(true)}
                        >
                            Thêm thanh toán
                        </Button>
                        <Button danger onClick={handleClearPendingPayments}>
                            Xóa thanh toán đang chờ
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredPayments}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <AddPaymentModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={() => setIsAddModalVisible(false)}
            />

            <UpdatePaymentModal
                visible={isUpdateModalVisible}
                onClose={() => setIsUpdateModalVisible(false)}
                onSubmit={() => setIsUpdateModalVisible(false)}
                initialValues={selectedPayment}
            />

            <DeletePaymentModal
                visible={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                onConfirm={handleDeletePayment}
                selectedPayment={selectedPayment}
            />
        </div>
    );
};

export default PaymentPage;
