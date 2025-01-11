import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/AdminDashboard.css";
import Title from "../Components/Title/Title";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token);
        if (!token) {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthenticated(false);
        navigate("/admin");
    };

    return (
        <>
            <Title
                subTitle="Control website sections here"
                title="Admin Dashboard"
            />
            <div className="adminlogoutbtn">
                <button onClick={handleLogout} className="btn">
                    Log Out
                </button>
            </div>
            <section className="admingrid">
                <div className="adminitem">
                    <p className="adminitemtitle">Blogs</p>
                    <button
                        className="btn"
                        onClick={() => navigate("/admin/dashboard/blogs")}
                    >
                        Control
                    </button>
                </div>
                <div className="adminitem">
                    <p className="adminitemtitle">Services</p>
                    <button
                        className="btn"
                        onClick={() => navigate("/admin/dashboard/services")}
                    >
                        Control
                    </button>
                </div>
                <div className="adminitem">
                    <p className="adminitemtitle">Careers</p>
                    <button
                        className="btn"
                        onClick={() => navigate("/admin/dashboard/careers")}
                    >
                        Control
                    </button>
                </div>
                <div className="adminitem">
                    <p className="adminitemtitle">Admins</p>
                    <button
                        className="btn"
                        onClick={() => navigate("/admin/dashboard/admins")}
                    >
                        Control
                    </button>
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;
