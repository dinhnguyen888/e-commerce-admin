import React from "react";
import { Modal, Button } from "antd";

interface Payment {
    productPay: string;
}

interface DeletePaymentModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    selectedPayment: Payment | null;
}

const DeletePaymentModal: React.FC<DeletePaymentModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    selectedPayment,
}) => {
    return (
        <Modal
            title="Delete Payment"
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onConfirm}>
                    Delete
                </Button>,
            ]}
        >
            {selectedPayment ? (
                <p>
                    Are you sure you want to delete the payment for{" "}
                    {selectedPayment.productPay}?
                </p>
            ) : (
                <p>Are you sure you want to delete this payment?</p>
            )}
        </Modal>
    );
};

export default DeletePaymentModal;
