import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, Input, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UpdateRoleModal from "../components/modals/role/UpdateRoleModal";
import AddRoleModal from "../components/modals/role/AddRoleModal";
// import DeleteRoleModal from "../components/modals/role/DeleteRoleModal";
import { getAllRoles, createRole, updateRole, deleteRole } from "../api/role";
import { Role, RolePostDto, RoleUpdateDto } from "../entities/role";
import DeleteRoleModal from "../components/modals/role/DeleteRoleModal";

const { Search } = Input;

const RolePage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const data = await getAllRoles();
            setRoles(data);
        } catch (error) {
            message.error("Không thể lấy dữ liệu vai trò");
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async (values: RolePostDto) => {
        try {
            const newRole = await createRole(values);
            setRoles([...roles, newRole]);
            setIsAddModalVisible(false);
            message.success("Thêm vai trò thành công");
        } catch (error) {
            message.error("Không thể thêm vai trò");
        }
    };

    const handleUpdateRole = async (values: RoleUpdateDto) => {
        if (selectedRole) {
            try {
                const updatedRole = await updateRole(selectedRole.id, values);
                setRoles(
                    roles.map((role) =>
                        role.id === selectedRole.id ? updatedRole : role
                    )
                );
                setIsUpdateModalVisible(false);
                message.success("Cập nhật vai trò thành công");
            } catch (error) {
                message.error("Không thể cập nhật vai trò");
            }
        }
    };

    const handleDeleteRole = async () => {
        if (selectedRole) {
            try {
                await deleteRole(selectedRole.id);
                const data = await getAllRoles();
                setRoles(data);
                setIsDeleteModalVisible(false);
                message.success("Xóa vai trò thành công");
            } catch (error) {
                message.error("Không thể xóa vai trò");
            }
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const filteredRoles = roles.filter((role) =>
        role.roleName.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Tên vai trò",
            dataIndex: "roleName",
            key: "roleName",
            width: "30%",
        },

        {
            title: "Hành động",
            key: "actions",
            align: "center" as "center",
            width: "20%",
            render: (_: any, record: Role) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setSelectedRole(record);
                            setIsUpdateModalVisible(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setSelectedRole(record);
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
                        placeholder="Tìm kiếm vai trò"
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        onSearch={handleSearch}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalVisible(true)}
                    >
                        Thêm vai trò
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredRoles}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <AddRoleModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSubmit={handleAddRole}
            />

            <UpdateRoleModal
                visible={isUpdateModalVisible}
                onClose={() => setIsUpdateModalVisible(false)}
                onSubmit={handleUpdateRole}
                initialValues={selectedRole}
            />

            <DeleteRoleModal
                visible={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                onConfirm={handleDeleteRole}
                roleName={selectedRole ? selectedRole.roleName : ""}
            />
        </div>
    );
};

export default RolePage;
