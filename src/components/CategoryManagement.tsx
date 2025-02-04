import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    Category,
    CategoryPostDto,
    CategoryUpdateDto,
} from "../entities/category";

interface CategoryManagementProps {
    categories: Category[];
    onAddCategory: (values: CategoryPostDto) => void;
    onUpdateCategory: (id: string, values: CategoryUpdateDto) => void;
    onDeleteCategory: (id: string) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({
    categories,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null
    );
    const [form] = Form.useForm();

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Danh mục cha?",
            dataIndex: "blockName",
            key: "blockName",
        },
        {
            title: "Đường dẫn",
            dataIndex: "frontendEndpoint",
            key: "frontendEndpoint",
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (_: any, record: Category) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedCategory(record);
                            form.setFieldsValue(record);
                            setIsModalVisible(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setCategoryToDelete(record);
                            setIsDeleteModalVisible(true);
                        }}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSubmit = async (values: any) => {
        if (selectedCategory) {
            await onUpdateCategory(selectedCategory.id, values);
        } else {
            await onAddCategory(values);
        }
        setIsModalVisible(false);
        form.resetFields();
        setSelectedCategory(null);
    };

    const handleDelete = () => {
        if (categoryToDelete) {
            onDeleteCategory(categoryToDelete.id);
            setIsDeleteModalVisible(false);
            setCategoryToDelete(null);
        }
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setSelectedCategory(null);
                    form.resetFields();
                    setIsModalVisible(true);
                }}
                style={{ marginBottom: 16 }}
            >
                Thêm danh mục
            </Button>

            <Table columns={columns} dataSource={categories} rowKey="id" />

            <Modal
                title={selectedCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setSelectedCategory(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="categoryName"
                        label="Tên danh mục"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên danh mục!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="blockName" label="Tên khối">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="frontendEndpoint"
                        label="Đường dẫn"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đường dẫn!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button
                            onClick={() => setIsModalVisible(false)}
                            style={{ marginRight: 8 }}
                        >
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {selectedCategory ? "Cập nhật" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Xác nhận xóa"
                open={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={() => {
                    setIsDeleteModalVisible(false);
                    setCategoryToDelete(null);
                }}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa danh mục này không?</p>
            </Modal>
        </div>
    );
};

export default CategoryManagement;
