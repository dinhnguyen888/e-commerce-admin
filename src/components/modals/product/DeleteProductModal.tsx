import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProduct } from "../../../api/productApi";

interface DeleteProductModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedProduct: { id: string };
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    visible,
    selectedProduct,
    onClose,
    onConfirm,
}) => {
    const handleDelete = async () => {
        onConfirm();
    };

    return (
        <Modal
            title={
                <>
                    <ExclamationCircleOutlined className="text-red-500 mr-2" />
                    Delete Product
                </>
            }
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={handleDelete}
                >
                    Delete
                </Button>,
            ]}
        >
            <p>
                Are you sure you want to delete this product? This action cannot
                be undone.
            </p>
        </Modal>
    );
};

export default DeleteProductModal;
