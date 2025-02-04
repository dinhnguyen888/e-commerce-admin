import React from "react";
import { Button } from "antd";
declare global {
    interface Window {
        cloudinary: any;
    }
}

interface UploadWidgetProps {
    onUpload: (url: string) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUpload }) => {
    const openWidget = () => {
        if (!window.cloudinary) {
            alert("Cloudinary chưa được tải xong!");
            return;
        }

        window.cloudinary.openUploadWidget(
            {
                cloudName: "da2f3gmrc", // Thay bằng Cloud Name của bạn
                uploadPreset: "ECommerce", // Thay bằng Upload Preset của bạn
                sources: ["local", "url", "camera"],
                multiple: false,
                defaultSource: "local",
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    console.log("Upload thành công:", result.info);
                    onUpload(result.info.secure_url); // Gọi callback với URL
                }
            }
        );
    };

    return (
        <Button type="primary" onClick={openWidget}>
            Tải lên tệp
        </Button>
    );
};

export default UploadWidget;
