import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token); // Set the state based on token presence
        if (!token) {
            navigate("/admin"); // Redirect to login page if no token found
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // Remove token from localStorage
        setIsAuthenticated(false); // Update state to reflect logout
        navigate("/admin"); // Redirect to login page
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
