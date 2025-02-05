import React, { useState } from "react";
import {
    Layout,
    Menu,
    theme,
    Button,
    Avatar,
    Dropdown,
    Badge,
    message,
} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    ShoppingOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    BellOutlined,
    ShoppingCartOutlined,
    FileTextOutlined,
    CreditCardOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLClick = () => {
        message.info("Sắp ra mắt");
    };
    const items = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Bảng điều khiển",
            onClick: () => navigate("/dashboard"),
        },
        {
            key: "products",
            icon: <ShoppingOutlined />,
            label: "Sản phẩm",
            onClick: () => navigate("/products"),
        },
        {
            key: "cms",
            icon: <FileTextOutlined />,
            label: "CMS",
            onClick: () => navigate("/cms"),
        },
        {
            key: "payments",
            icon: <CreditCardOutlined />,
            label: "Thanh toán",
            onClick: () => navigate("/payments"),
        },
        {
            key: "customers",
            icon: <UserOutlined />,
            label: "Khách hàng",
            onClick: () => navigate("/customers"),
        },
        {
            key: "roles",
            icon: <TeamOutlined />,
            label: "Vai trò",
            onClick: () => navigate("/roles"),
        },
    ];

    const userMenuItems: any[] = [
        {
            key: "profile",
            label: "Hồ sơ",
            icon: <UserOutlined />,
            onClick: handleLClick,
        },
        {
            key: "settings",
            label: "Cài đặt",
            icon: <SettingOutlined />,
            onClick: handleLClick,
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Đăng xuất",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical p-4">
                    <h1 className="text-white text-xl font-bold text-center">
                        {!collapsed && "Quản trị"}
                    </h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["dashboard"]}
                    items={items}
                    className="h-screen"
                />
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0, background: colorBgContainer }}
                    className="flex justify-between items-center px-4 shadow"
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-xl"
                    />
                    <div className="flex items-center gap-4">
                        <Badge count={1}>
                            <BellOutlined
                                className="text-xl cursor-pointer"
                                onClick={handleLClick}
                            />
                        </Badge>
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            trigger={["click"]}
                        >
                            <div className="flex items-center mr-20 gap-2 cursor-pointer">
                                <Avatar icon={<UserOutlined />} />
                                <span>Quản trị viên</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
