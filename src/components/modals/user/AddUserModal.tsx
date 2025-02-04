import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";

interface AddUserModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Add New User"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <p>Lưu ý password mặc định là Abc123@</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onSubmit({ ...values, roleId: values.role });
                    form.resetFields();
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: "Please input the name!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please input the email!" },
                        { type: "email", message: "Invalid email format!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: "Please input password!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        { required: true, message: "Please select a role!" },
                    ]}
                >
                    <Select>
                        <Select.Option value={1}>Admin</Select.Option>
                        <Select.Option value={2}>User</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item className="text-right">
                    <Button onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add User
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserModal;
