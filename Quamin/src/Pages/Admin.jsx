import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/Admin.css";

const Admin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                const { token } = data;
                console.log("Received Token:", token);
                localStorage.setItem("jwtToken", token);
                setIsAuthenticated(true);
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="background">
            <form className="adminloginform" onSubmit={handleLogin}>
                <h3>Admin Login</h3>

                {error && <p className="error-message">{error}</p>}

                <label className="adminlabel" htmlFor="username">
                    Username
                </label>
                <input
                    className="admininput"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className="adminlabel" htmlFor="password">
                    Password
                </label>
                <input
                    className="admininput"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="adminbtns">
                    <button type="submit" className="btn">
                        Log In
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Admin;