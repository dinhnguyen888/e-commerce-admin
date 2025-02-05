import React from "react";
import { Modal, Button } from "antd";

interface DeleteRoleModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    roleName: string;
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    roleName,
}) => {
    return (
        <Modal
            title="Delete Role"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" danger onClick={onConfirm}>
                    Delete
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete the role "{roleName}"?</p>
        </Modal>
    );
};

export default DeleteRoleModal;
