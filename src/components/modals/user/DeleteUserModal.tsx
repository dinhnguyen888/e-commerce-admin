import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface DeleteUserModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    visible,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal
            title={
                <>
                    <ExclamationCircleOutlined className="text-red-500 mr-2" />
                    Delete User
                </>
            }
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" danger onClick={onConfirm}>
                    Delete
                </Button>,
            ]}
        >
            <p>
                Are you sure you want to delete this user? This action cannot be
                undone.
            </p>
        </Modal>
    );
};

export default DeleteUserModal;
