import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Table, message } from "antd";
import {
    ShoppingCartOutlined,
    UserOutlined,
    DollarOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getAllProducts } from "../api/productApi";
import { getAllAccounts } from "../api/accountApi";
import { getAllPayments } from "../api/paymentApi";
import { getCartByUserId } from "../api/cartApi";
import { getAccessToken } from "../store/useAuthStore";

const { Title } = Typography;

const DashboardPage: React.FC = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [salesData, setSalesData] = useState<
        { name: string; sales: number }[]
    >([]);
    const [transactions, setTransactions] = useState<
        {
            key: string;
            date: string;
            customer: string;
            amount: string;
            status: string;
        }[]
    >([]);
    const accessToken = getAccessToken();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const products = await getAllProducts(1, 1000);
            const accounts = await getAllAccounts(accessToken || "");
            const payments = await getAllPayments();
            const cartItems = await getCartByUserId(accessToken || "");

            const completedPayments = payments.filter(
                (payment) => payment.paymentStatus
            );

            setTotalProducts(products.length);
            setTotalCustomers(
                accounts.filter((account) => account.roleName !== "Admin")
                    .length
            );
            setTotalOrders(cartItems.length);
            setTotalRevenue(
                completedPayments.reduce(
                    (total, payment) => total + payment.productPrice,
                    0
                )
            );

            // Calculate sales data for the chart
            const salesData = Array.from({ length: 12 }, (_, i) => ({
                name: new Date(0, i).toLocaleString("default", {
                    month: "short",
                }),
                sales: completedPayments
                    .filter(
                        (payment) =>
                            new Date(payment.paymentDate).getMonth() === i
                    )
                    .reduce(
                        (total, payment) => total + payment.productPrice,
                        0
                    ),
            }));
            setSalesData(salesData);

            // Transactions data (only 5 most recent)
            const transactions = payments
                .sort(
                    (a, b) =>
                        new Date(b.paymentDate).getTime() -
                        new Date(a.paymentDate).getTime()
                )
                .slice(0, 5)
                .map((payment) => ({
                    key: payment.id,
                    date: new Date(payment.paymentDate).toLocaleDateString(),
                    customer: payment.userId,
                    amount: `${payment.productPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}`,
                    status: payment.paymentStatus ? "Hoàn thành" : "Đang xử lý",
                }));
            setTransactions(transactions);
        } catch (error) {
            message.error("Không thể lấy dữ liệu bảng điều khiển");
        }
    };

    const columns = [
        {
            title: "Ngày",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
    ];

    return (
        <div className="p-6">
            <Title level={2}>Bảng điều khiển</Title>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div className="flex items-center">
                            <ShoppingCartOutlined className="text-2xl text-blue-500 mr-2" />
                            <div>
                                <p className="text-gray-500">Tổng đơn hàng</p>
                                <h3 className="text-xl font-bold">
                                    {totalOrders}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div className="flex items-center">
                            <UserOutlined className="text-2xl text-green-500 mr-2" />
                            <div>
                                <p className="text-gray-500">Tổng khách hàng</p>
                                <h3 className="text-xl font-bold">
                                    {totalCustomers}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div className="flex items-center">
                            <DollarOutlined className="text-2xl text-yellow-500 mr-2" />
                            <div>
                                <p className="text-gray-500">Tổng doanh thu</p>
                                <h3 className="text-xl font-bold">
                                    {totalRevenue.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div className="flex items-center">
                            <ShoppingOutlined className="text-2xl text-purple-500 mr-2" />
                            <div>
                                <p className="text-gray-500">Tổng sản phẩm</p>
                                <h3 className="text-xl font-bold">
                                    {totalProducts}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Sales Chart */}
            <Card className="my-11">
                <Title level={4}>Tổng quan doanh số</Title>
                <div style={{ height: "400px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Recent Transactions */}
            <Card>
                <Title level={4}>Giao dịch gần đây</Title>
                <Table
                    columns={columns}
                    dataSource={transactions}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};

export default DashboardPage;
