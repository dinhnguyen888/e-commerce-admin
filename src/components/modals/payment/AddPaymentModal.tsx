import React from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { createPayment } from "../../../api/paymentApi";
import { PaymentPostDto } from "../../../entities/payment";

interface AddPaymentModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: PaymentPostDto) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    const handleAdd = async (values: PaymentPostDto) => {
        await createPayment(values);
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Add New Payment"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAdd}>
                <Form.Item
                    name="productPay"
                    label="Product Pay"
                    rules={[
                        {
                            required: true,
                            message: "Please input the product pay!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="productId"
                    label="Product ID"
                    rules={[
                        {
                            required: true,
                            message: "Please input the product ID!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="userId"
                    label="User ID"
                    rules={[
                        {
                            required: true,
                            message: "Please input the user ID!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="paymentGateway"
                    label="Payment Gateway"
                    rules={[
                        {
                            required: true,
                            message: "Please input the payment gateway!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="productPrice"
                    label="Product Price"
                    rules={[
                        {
                            required: true,
                            message: "Please input the product price!",
                        },
                    ]}
                >
                    <InputNumber prefix="$" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item className="text-right">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add Payment
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddPaymentModal;
