import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, Tag, Input, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddUserModal from "../components/modals/user/AddUserModal";
import UpdateUserModal from "../components/modals/user/UpdateUserModal";
import DeleteUserModal from "../components/modals/user/DeleteUserModal";
import {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
} from "../api/account";
import { Account, AccountPostDto, AccountUpdateDto } from "../entities/account";
import { getAccessToken } from "../store/useAuthStore";

const { Search } = Input;

const UserPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Account | null>(null);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const data = await getAllAccounts(accessToken || "");
            setAccounts(data);
        } catch (error) {
            message.error("Failed to fetch accounts");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (values: AccountPostDto) => {
        try {
            const newUser = await createAccount(values, accessToken);
            setAccounts([...accounts, newUser]);
            setIsAddModalVisible(false);
            message.success("User added successfully");
        } catch (error) {
            message.error("Failed to add user");
        }
    };

    const handleUpdateUser = async (values: AccountUpdateDto) => {
        if (selectedUser) {
            try {
                const updatedUser = await updateAccount(
                    selectedUser.id,
                    values,
                    accessToken
                );
                setAccounts(
                    accounts.map((user) =>
                        user.id === selectedUser.id ? updatedUser : user
                    )
                );
                setIsUpdateModalVisible(false);
                message.success("User updated successfully");
            } catch (error) {
                message.error("Failed to update user");
            }
        }
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await deleteAccount(selectedUser.id, accessToken);
                const data = await getAllAccounts(accessToken || "");
                setAccounts(data);
                setIsDeleteModalVisible(false);
                message.success("User deleted successfully");
            } catch (error) {
                message.error("Failed to delete user");
            }
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredAccounts = accounts.filter(
        (account) =>
            account.name.toLowerCase().includes(searchText.toLowerCase()) ||
            account.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "30%",
        },
        {
            title: "Role",
            dataIndex: "roleName",
            key: "roleId",
            width: "10%",
            render: (role: number) => (
                <Tag color={role === 1 ? "blue" : "green"}>{role}</Tag>
            ),
        },
        {
            title: "View",
            key: "view",
            align: "center" as "center",
            width: "15%",
            render: (_: any, record: Account) => (
                <Space>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "white",
                            color: "orange",
                            borderColor: "orange",
                        }}
                        onClick={() => navigate(`/user-cart/${record.id}`)}
                    >
                        Cart
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "white",
                            color: "green",
                            borderColor: "green",
                        }}
                        onClick={() => navigate(`/user-payment/${record.id}`)}
                    >
                        Payment
                    </Button>
                </Space>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center" as "center",
            width: "15%",
            render: (_: any, record: Account) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setSelectedUser(record);
                            setIsUpdateModalVisible(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedUser(record);
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
                    <Search
                        placeholder="Search users"
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        onSearch={handleSearch}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalVisible(true)}
                    >
                        Add User
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredAccounts}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <AddUserModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={handleAddUser}
            />

            <UpdateUserModal
                visible={isUpdateModalVisible}
                onClose={() => setIsUpdateModalVisible(false)}
                onSubmit={handleUpdateUser}
                initialValues={selectedUser}
            />

            <DeleteUserModal
                visible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                onConfirm={handleDeleteUser}
            />
        </div>
    );
};

export default UserPage;
