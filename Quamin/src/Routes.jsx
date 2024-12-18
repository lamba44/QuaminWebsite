import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import App from "./App";
import JobApplication from "./Pages/JobApplication";
import ServiceBooking from "./Pages/ServiceBooking";
import NotFound404 from "./Pages/NotFound404";
import Admin from "./Pages/Admin";
import AdminDashboard from "./Pages/AdminDashboard";

const isAuthenticated = () => {
    return !!localStorage.getItem("adminToken"); // Check if the token exists
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/admin" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/jobs" element={<JobApplication />} />
                <Route path="/services" element={<ServiceBooking />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<NotFound404 />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
