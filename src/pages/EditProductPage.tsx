import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getProductForUpdating, updateProduct } from "../api/product";
import {
    ProductUpdateDto,
    ProductGetDetailDto,
    ProductGetForUpdate,
} from "../entities/product";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../components/UploadWidget";

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] =
        useState<ProductGetForUpdate | null>(null);
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const product = await getProductForUpdating(id);
                setInitialValues(product);
                setDescriptionDetail(product.descriptionDetail || "");
                setImageUrls(product.imageUrls || []);
                form.setFieldsValue(product);
            }
        };
        fetchProduct();
    }, [id, form]);

    const handleUpdate = async (values: ProductUpdateDto) => {
        if (id) {
            const updatedProductData = {
                ...values,
                descriptionDetail,
                imageUrls,
            };
            await updateProduct(id, updatedProductData);
            navigate("/products");
        }
    };

    const handleUpload = (url: string) => {
        setImageUrls((prevUrls) => [...prevUrls, url]);
    };

    const handleDeleteImage = (url: string) => {
        setImageUrls((prevUrls) =>
            prevUrls.filter((imageUrl) => imageUrl !== url)
        );
    };

    return (
        <div className="p-6">
            <h2>Sửa sản phẩm</h2>
            {initialValues && (
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={handleUpdate}
                >
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
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea />
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
                    <Form.Item name="tag" label="Thẻ">
                        <Input />
                    </Form.Item>
                    <Form.Item name="specification" label="Thông số kỹ thuật">
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Danh mục">
                        <Input />
                    </Form.Item>
                    <Form.Item name="productUrl" label="Đường dẫn sản phẩm">
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
                        <div style={{ marginTop: "10px" }}>
                            {imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: "10px" }}
                                    >
                                        {url}
                                    </a>
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => handleDeleteImage(url)}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button
                            onClick={() => navigate("/products")}
                            className="mr-2"
                        >
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Cập nhật sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default EditProductPage;
