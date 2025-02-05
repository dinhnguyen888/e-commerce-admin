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
} from "../api/accountApi";
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
            message.error("Không thể lấy dữ liệu tài khoản");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (values: AccountPostDto) => {
        try {
            const newUser = await createAccount(values, accessToken);
            setAccounts([...accounts, newUser]);
            setIsAddModalVisible(false);
            message.success("Thêm người dùng thành công");
        } catch (error) {
            message.error("Không thể thêm người dùng");
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
                message.success("Cập nhật người dùng thành công");
            } catch (error) {
                message.error("Không thể cập nhật người dùng");
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
                message.success("Xóa người dùng thành công");
            } catch (error) {
                message.error("Không thể xóa người dùng");
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
            title: "Tên",
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
            title: "Vai trò",
            dataIndex: "roleName",
            key: "roleId",
            width: "10%",
            render: (role: number) => (
                <Tag color={role === 1 ? "blue" : "green"}>{role}</Tag>
            ),
        },
        {
            title: "Xem",
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
                        Giỏ hàng
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
                        Thanh toán
                    </Button>
                </Space>
            ),
        },
        {
            title: "Hành động",
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
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedUser(record);
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
                        placeholder="Tìm kiếm người dùng"
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        onSearch={handleSearch}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalVisible(true)}
                    >
                        Thêm người dùng
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
