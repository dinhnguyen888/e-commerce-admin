import React from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct } from "../../../api/productApi";

interface AddProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    const handleAdd = async (values: any) => {
        await createProduct(values);
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Add New Product"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAdd}>
                <Form.Item
                    name="name"
                    label="Product Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the product name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        { required: true, message: "Please input the price!" },
                    ]}
                >
                    <InputNumber prefix="$" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="image" label="Image">
                    <Upload listType="picture-card">
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item className="text-right">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProductModal;
