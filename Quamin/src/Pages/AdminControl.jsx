import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/AdminControl.css";
import Title from "../Components/Title/Title";

const AdminControl = () => {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                "http://localhost:5000/api/admin/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setAdmins(data);
        } catch (err) {
            setError("Failed to fetch admins.");
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                "http://localhost:5000/api/admin/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (response.ok) {
                setSuccess("Admin added successfully.");
                fetchAdmins();
                setUsername("");
                setPassword("");
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to add admin.");
        }
    };

    const handleDeleteAdmin = async (id) => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(
                `http://localhost:5000/api/admin/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setSuccess("Admin deleted successfully.");
                fetchAdmins();
            } else {
                setError("Failed to delete admin.");
            }
        } catch (err) {
            setError("Failed to delete admin.");
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div>
            <Title subTitle="Add/Remove Admins here" title="Admins Control" />
            <form className="addadmin" onSubmit={handleAddAdmin}>
                <input
                    className="addadmininput"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="addadmininput"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn addadminbtn" type="submit">
                    Add Admin
                </button>
                <button
                    className="btn gobackbtn"
                    type="button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Go Back
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <p className="adminslistheader">Existing Admins:</p>
            <ul className="adminslist">
                {admins.map((admin) => (
                    <li key={admin._id} className="adminlistitem">
                        <span className="adminusername">{admin.username}</span>
                        <button
                            className="adminremovebtn"
                            onClick={() => handleDeleteAdmin(admin._id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminControl;
