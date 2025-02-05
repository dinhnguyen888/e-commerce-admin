import React, { useState } from "react";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { adminLogin } from "../api/loginApi";

interface LoginButtonProps {
    email: string;
    password: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ email, password }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await adminLogin(email, password);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={handleLogin}
                loading={loading}
                className="w-full h-12 text-lg font-semibold rounded-md 
                          bg-gradient-to-r from-blue-500 to-blue-600 
                          hover:from-blue-600 hover:to-blue-700 
                          border-0 shadow-lg hover:shadow-xl 
                          transition-all duration-300"
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
            {error && (
                <div className="w-full p-3 rounded-md bg-red-50 border border-red-200">
                    <p className="text-red-500 text-sm text-center">{error}</p>
                </div>
            )}
        </div>
    );
};

export default LoginButton;
