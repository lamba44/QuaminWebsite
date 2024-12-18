import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate("/admin"); // Redirect to login page if token is not found
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Clear the JWT token from localStorage
        window.location.href = "/"; // Redirect to home or login page
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Add dashboard content here */}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default AdminDashboard;
