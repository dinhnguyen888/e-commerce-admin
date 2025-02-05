import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { RoleUpdateDto, Role } from "../../../entities/role";

interface UpdateRoleModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: RoleUpdateDto) => void;
    initialValues: Role | null;
}

const UpdateRoleModal: React.FC<UpdateRoleModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialValues,
}) => {
    const [form] = Form.useForm();

    const handleFinish = (values: RoleUpdateDto) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Cập nhật vai trò"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialValues || {}}
            >
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
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateRoleModal;
