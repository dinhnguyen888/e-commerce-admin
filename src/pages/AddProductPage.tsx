import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import { ProductPostDto } from "../entities/product";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../components/UploadWidget";

const AddProductPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleAddProduct = async (values: ProductPostDto) => {
        const productData = {
            ...values,
            descriptionDetail,
            createdAt: new Date().toISOString(),
            imageUrls,
        };
        console.log("Dữ liệu sản phẩm:", productData); // Hiển thị dữ liệu trước khi gửi lên server
        try {
            await createProduct(productData);
            message.success("Thêm sản phẩm thành công");
            navigate("/products");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                message.error(
                    "Không thể thêm sản phẩm: " + error.response.data.message
                );
            } else {
                message.error("Không thể thêm sản phẩm");
            }
        }
    };

    const handleUpload = (url: string) => {
        setImageUrls((prevUrls) => [...prevUrls, url]);
    };

    return (
        <div className="p-6">
            <Card title="Thêm sản phẩm mới">
                <Form form={form} layout="vertical" onFinish={handleAddProduct}>
                    <Form.Item
                        name="title"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên sản phẩm!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mô tả!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả chi tiết"
                        style={{ height: "400px" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mô tả chi tiết!",
                            },
                        ]}
                    >
                        <ReactQuill
                            value={descriptionDetail}
                            onChange={setDescriptionDetail}
                            style={{ height: "300px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="tag"
                        label="Thẻ"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập thẻ!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá!",
                            },
                        ]}
                    >
                        <InputNumber prefix="$" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="specification"
                        label="Thông số kỹ thuật"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập thông số kỹ thuật!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập danh mục!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn hình ảnh"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Vui lòng tải lên ít nhất một hình ảnh!",
                            },
                        ]}
                    >
                        <UploadWidget onUpload={handleUpload} />
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                marginTop: "10px",
                            }}
                        >
                            {imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative",
                                        width: "100px",
                                        height: "100px",
                                    }}
                                >
                                    <img
                                        src={url}
                                        alt={`product-${index}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "0",
                                            left: "0",
                                            right: "0",
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                            color: "white",
                                            textAlign: "center",
                                            opacity: "0",
                                            transition: "opacity 0.3s",
                                            padding: "5px",
                                        }}
                                        className="image-hover"
                                    >
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "white",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {url}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="productUrl"
                        label="Đường dẫn sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập đường dẫn sản phẩm!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button
                            onClick={() => navigate("/products")}
                            className="mr-2"
                        >
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Thêm sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddProductPage;
