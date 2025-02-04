import React, { useState } from "react";
import { Layout, Menu, theme, Button, Avatar, Dropdown, Badge } from "antd";
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

    const items = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => navigate("/dashboard"),
        },
        {
            key: "products",
            icon: <ShoppingOutlined />,
            label: "Products",
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
            label: "Payments",
            onClick: () => navigate("/payments"),
        },
        {
            key: "customers",
            icon: <UserOutlined />,
            label: "Customers",
            onClick: () => navigate("/customers"),
        },
        {
            key: "cart",
            icon: <ShoppingCartOutlined />,
            label: "Shopping Cart",
            onClick: () => navigate("/cart"),
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
            onClick: () => navigate("/settings"),
        },
    ];

    const userMenuItems: any[] = [
        {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
        },
        {
            key: "settings",
            label: "Settings",
            icon: <SettingOutlined />,
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical p-4">
                    <h1 className="text-white text-xl font-bold text-center">
                        {!collapsed && "Admin"}
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
                        <Badge count={5}>
                            <BellOutlined className="text-xl cursor-pointer" />
                        </Badge>
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            trigger={["click"]}
                        >
                            <div className="flex items-center mr-20 gap-2 cursor-pointer">
                                <Avatar icon={<UserOutlined />} />
                                <span>Admin</span>
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
