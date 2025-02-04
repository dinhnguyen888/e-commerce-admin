import React, { useState, useEffect } from "react";
import { Input, Typography } from "antd";
import {
    UserOutlined,
    LockOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const { Title } = Typography;

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <ShoppingOutlined className="text-4xl text-blue-600 mb-4" />
                    <Title level={2} className="text-center m-0">
                        Admin Login
                    </Title>
                    <p className="text-gray-500 mt-2">
                        Welcome back! Please login to your account.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <UserOutlined className="absolute left-3 top-3 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 w-full rounded-md border-gray-200 hover:border-blue-500 transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <LockOutlined className="absolute left-3 top-3 text-gray-400" />
                        <Input.Password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-12 w-full rounded-md border-gray-200 hover:border-blue-500 transition-colors"
                        />
                    </div>

                    <LoginButton email={email} password={password} />

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Forgot your password?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Reset here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
