import {
    AppstoreOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    CreditCardOutlined,
    TeamOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

export const menuItems = [
    {
        key: "dashboard",
        icon: AppstoreOutlined,
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        key: "products",
        icon: ShoppingCartOutlined,
        label: "Products",
        path: "/products",
    },
    {
        key: "accounts",
        icon: UserOutlined,
        label: "Accounts",
        path: "/accounts",
    },
    {
        key: "payments",
        icon: CreditCardOutlined,
        label: "Payments",
        path: "/payments",
    },
    {
        key: "roles",
        icon: TeamOutlined,
        label: "Roles",
        path: "/roles",
    },
    {
        key: "news",
        icon: FileTextOutlined,
        label: "News",
        path: "/news",
    },
];
