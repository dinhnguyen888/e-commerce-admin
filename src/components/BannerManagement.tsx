import React, { useState } from "react";
import { Button, Card, Modal, Form, Input, Space, List } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Banner, BannerPostDto, BannerUpdateDto } from "../entities/banner";
import UploadWidget from "./UploadWidget";

interface BannerManagementProps {
    banners: Banner[];
    onAddBanner: (values: BannerPostDto) => void;
    onUpdateBanner: (id: string, values: BannerUpdateDto) => void;
    onDeleteBanner: (id: string) => void;
}

const BannerManagement: React.FC<BannerManagementProps> = ({
    banners,
    onAddBanner,
    onUpdateBanner,
    onDeleteBanner,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
    const [form] = Form.useForm();

    const handleAdd = (values: BannerPostDto) => {
        onAddBanner(values);
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleUpdate = (values: BannerUpdateDto) => {
        if (selectedBanner) {
            onUpdateBanner(selectedBanner.id, values);
            setIsModalVisible(false);
            form.resetFields();
        }
    };

    const handleDelete = () => {
        if (bannerToDelete) {
            onDeleteBanner(bannerToDelete.id);
            setIsDeleteModalVisible(false);
            setBannerToDelete(null);
        }
    };

    const handleUpload = (url: string) => {
        form.setFieldsValue({ bannerUrl: url });
        setIsModalVisible(true);
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setSelectedBanner(null);
                    setIsModalVisible(true);
                }}
                className="mb-4"
            >
                Thêm biểu ngữ
            </Button>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={banners}
                renderItem={(banner) => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={banner.bannerName}
                                    src={banner.bannerUrl}
                                    style={{ height: 200, objectFit: "cover" }}
                                />
                            }
                            actions={[
                                <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setSelectedBanner(banner);
                                        form.setFieldsValue(banner);
                                        setIsModalVisible(true);
                                    }}
                                    style={{ marginRight: 8 }}
                                >
                                    Sửa
                                </Button>,
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => {
                                        setBannerToDelete(banner);
                                        setIsDeleteModalVisible(true);
                                    }}
                                    style={{ marginLeft: 8 }}
                                >
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <Card.Meta title={banner.bannerName} />
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title={selectedBanner ? "Sửa banner" : "Thêm banner"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={selectedBanner ? handleUpdate : handleAdd}
                >
                    <Form.Item
                        name="bannerName"
                        label="Tên banner"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên banner!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="bannerUrl"
                        label="Đường dẫn ảnh"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đường dẫn ảnh!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <UploadWidget onUpload={handleUpload} />
                    <Form.Item className="text-right">
                        <Button
                            onClick={() => setIsModalVisible(false)}
                            className="mr-2"
                        >
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            {selectedBanner ? "Cập nhật" : "Thêm"}
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
                    setBannerToDelete(null);
                }}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>
                    Bạn có chắc chắn muốn xóa banner "
                    {bannerToDelete?.bannerName}"?
                </p>
            </Modal>
        </div>
    );
};

export default BannerManagement;
