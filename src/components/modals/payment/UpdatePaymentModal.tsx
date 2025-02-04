import React from "react";
import { Modal, Form, InputNumber, Select, DatePicker, Button } from "antd";

interface UpdatePaymentModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues: any;
}

const UpdatePaymentModal: React.FC<UpdatePaymentModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialValues,
}) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Update Payment"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={(values) => {
                    onSubmit(values);
                    form.resetFields();
                }}
            >
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                        { required: true, message: "Please input the amount!" },
                    ]}
                >
                    <InputNumber prefix="$" style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="method"
                    label="Payment Method"
                    rules={[
                        {
                            required: true,
                            message: "Please select a payment method!",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="credit">
                            Credit Card
                        </Select.Option>
                        <Select.Option value="debit">Debit Card</Select.Option>
                        <Select.Option value="bank">
                            Bank Transfer
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Payment Date"
                    rules={[
                        {
                            required: true,
                            message: "Please select a payment date!",
                        },
                    ]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item className="text-right">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Update Payment
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdatePaymentModal;
