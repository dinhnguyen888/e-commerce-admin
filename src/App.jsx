import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import PropTypes from "prop-types";
import CMSPage from "./pages/CMSPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import EditProductPage from "./pages/EditProductPage";
import PaymentPage from "./pages/PaymentPage";
import AddProductPage from "./pages/AddProductPage";
import UserPaymentPage from "./pages/UserPaymentPage";
import UserCartPage from "./pages/UserCartPage";
import RolePage from "./pages/RolePage";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Routes>
                                    <Route
                                        path="/dashboard"
                                        element={<DashboardPage />}
                                    />
                                    <Route
                                        path="/products"
                                        element={<ProductPage />}
                                    />
                                    <Route
                                        path="/edit-product/:id"
                                        element={<EditProductPage />}
                                    />
                                    <Route path="/cms" element={<CMSPage />} />

                                    <Route
                                        path="/customers"
                                        element={<UserPage />}
                                    />
                                    <Route
                                        path="/payments"
                                        element={<PaymentPage />}
                                    />
                                    <Route
                                        path="/add-product"
                                        element={<AddProductPage />}
                                    />
                                    <Route
                                        path="/user-payment/:userId"
                                        element={<UserPaymentPage />}
                                    />
                                    <Route
                                        path="/user-cart/:userId"
                                        element={<UserCartPage />}
                                    />
                                    <Route
                                        path="/roles"
                                        element={<RolePage />}
                                    />
                                </Routes>
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default App;
