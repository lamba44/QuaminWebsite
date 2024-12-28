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
import AdminControl from "./Pages/AdminControl";
import BlogControl from "./Pages/BlogControl";
import BlogHome from "./Pages/BlogHome";
import BlogIndividual from "./Pages/BlogIndividual";

const isAuthenticated = () => {
    return !!localStorage.getItem("jwtToken");
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
                <Route path="/blogs" element={<BlogHome />} />
                <Route path="/blogs/:id" element={<BlogIndividual />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/admins"
                    element={
                        <ProtectedRoute>
                            <AdminControl />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/blogs"
                    element={
                        <ProtectedRoute>
                            <BlogControl />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<NotFound404 />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
