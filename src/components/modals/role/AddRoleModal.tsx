import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { RolePostDto } from "../../../entities/role";

interface AddRoleModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: RolePostDto) => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    const handleFinish = (values: RolePostDto) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Thêm vai trò"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="roleName"
                    label="Tên vai trò"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên vai trò!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item className="text-right">
                    <Button onClick={onClose} className="mr-2">
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRoleModal;
