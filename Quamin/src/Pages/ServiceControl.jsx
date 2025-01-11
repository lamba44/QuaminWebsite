import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Components/Title/Title";
import "./Styling/ServiceControl.css";

const ServiceControl = () => {
    const navigate = useNavigate();

    // States
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Fields for adding a new service
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");

    // UI messages
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Retrieve token from localStorage for admin routes
    const token = localStorage.getItem("jwtToken");

    // ------------------ FETCH SERVICES ------------------ //
    const fetchServices = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/services"
            );
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
            setError("Failed to fetch services.");
        }
    };

    // ------------------ FETCH BOOKINGS (Admin) ------------------ //
    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/bookings",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setBookings(response.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to fetch bookings (admin only).");
        }
    };

    // ------------------ ADD A SERVICE (Admin) ------------------ //
    const handleAddService = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!serviceName.trim()) {
            setError("Service name cannot be empty.");
            return;
        }
        if (!serviceDescription.trim()) {
            setError("Service description cannot be empty.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/services",
                {
                    name: serviceName,
                    description: serviceDescription,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 201) {
                setSuccess("Service added successfully.");
                setServiceName("");
                setServiceDescription("");
                fetchServices(); // refresh
            }
        } catch (err) {
            console.error("Error adding service:", err);
            setError(
                "Failed to add service. Make sure you're logged in as admin."
            );
        }
    };

    // ------------------ DELETE A SERVICE (Admin) ------------------ //
    const handleDeleteService = async (id) => {
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/services/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                setSuccess("Service removed successfully.");
                fetchServices();
            }
        } catch (err) {
            console.error("Error deleting service:", err);
            setError(
                "Failed to remove service. Make sure you're logged in as admin."
            );
        }
    };

    // ------------------ UPDATE BOOKING STATUS (Admin) ------------------ //
    const handleStatusChange = async (bookingId, newStatus) => {
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.patch(
                `http://localhost:5000/api/bookings/${bookingId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                setSuccess("Booking status updated.");
                fetchBookings();
            }
        } catch (err) {
            console.error("Error updating booking status:", err);
            setError(
                "Failed to update booking status. Make sure you're logged in as admin."
            );
        }
    };

    // ------------------ SORT / SPLIT BOOKINGS ------------------ //
    const parseDateTime = (dateStr, timeStr) =>
        new Date(`${dateStr}T${timeStr}:00`);
    const now = new Date();

    // Format date as DD-MMM-YYYY, e.g. 13-Aug-2025
    const formatBookingDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const shortMonth = months[parseInt(month, 10) - 1];
        return `${day}-${shortMonth}-${year}`;
    };

    // sort all bookings by date/time ascending
    const sortedAll = bookings.slice().sort((a, b) => {
        const dateA = parseDateTime(a.date, a.time);
        const dateB = parseDateTime(b.date, b.time);
        return dateA - dateB;
    });

    // split into upcoming vs. past
    const upcomingBookings = [];
    const pastBookings = [];

    sortedAll.forEach((b) => {
        const bookingDateTime = parseDateTime(b.date, b.time);
        if (bookingDateTime >= now) {
            upcomingBookings.push(b);
        } else {
            pastBookings.push(b);
        }
    });

    useEffect(() => {
        fetchServices();
        fetchBookings();
        // eslint-disable-next-line
    }, []);

    // Helper: pick the status class for background color
    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "status-pending";
            case "Completed":
                return "status-completed";
            case "Cancelled":
                return "status-cancelled";
            default:
                return "";
        }
    };

    return (
        <div className="service-control-page">
            <Title
                subTitle="Control Available Services and Bookings"
                title="Services Control"
            />

            <div className="goingbackbtnadmin">
                <button
                    className="btn gobackbtn"
                    type="button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Go Back
                </button>
            </div>

            <div className="service-control-container">
                {error && <p className="service-error-message">{error}</p>}
                {success && (
                    <p className="service-success-message">{success}</p>
                )}

                {/* ADD NEW SERVICE */}
                <div className="add-service-section">
                    <h2 className="service-section-heading">
                        Add a New Service
                    </h2>
                    <form
                        className="add-service-form"
                        onSubmit={handleAddService}
                    >
                        <input
                            type="text"
                            placeholder="Service Name"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Service Description"
                            value={serviceDescription}
                            onChange={(e) =>
                                setServiceDescription(e.target.value)
                            }
                        />
                        <button className="btn add-service-btn" type="submit">
                            Add Service
                        </button>
                    </form>
                </div>

                {/* EXISTING SERVICES */}
                <div className="existing-services-section">
                    <h2 className="service-section-heading">
                        Existing Services
                    </h2>
                    {services.length === 0 ? (
                        <p className="no-services">No services available.</p>
                    ) : (
                        <ul className="services-list">
                            {services.map((svc) => (
                                <li key={svc._id} className="service-list-item">
                                    <div className="service-info">
                                        <span className="service-name">
                                            {svc.name}
                                        </span>
                                        <span className="service-description">
                                            {svc.description}
                                        </span>
                                    </div>
                                    <button
                                        className="remove-service-btn"
                                        onClick={() =>
                                            handleDeleteService(svc._id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* UPCOMING BOOKINGS TABLE */}
                <div className="bookings-section">
                    <h2 className="service-section-heading">
                        Upcoming Bookings
                    </h2>
                    {upcomingBookings.length === 0 ? (
                        <p className="no-bookings">No upcoming bookings.</p>
                    ) : (
                        <table className="bookings-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingBookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>{b.name}</td>
                                        <td>{b.phone}</td>
                                        <td>{b.email}</td>
                                        <td>
                                            {b.serviceName ||
                                                b.service?.name ||
                                                "N/A"}
                                        </td>
                                        <td>{formatBookingDate(b.date)}</td>
                                        <td>{b.time}</td>
                                        <td>
                                            <select
                                                value={b.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        b._id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`status-dropdown ${getStatusClass(
                                                    b.status
                                                )}`}
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* PAST BOOKINGS TABLE */}
                <div className="bookings-section">
                    <h2 className="service-section-heading">Past Bookings</h2>
                    {pastBookings.length === 0 ? (
                        <p className="no-bookings">No past bookings.</p>
                    ) : (
                        <table className="bookings-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastBookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>{b.name}</td>
                                        <td>{b.phone}</td>
                                        <td>{b.email}</td>
                                        <td>
                                            {b.serviceName ||
                                                b.service?.name ||
                                                "N/A"}
                                        </td>
                                        <td>{formatBookingDate(b.date)}</td>
                                        <td>{b.time}</td>
                                        <td>
                                            <select
                                                value={b.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        b._id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`status-dropdown ${getStatusClass(
                                                    b.status
                                                )}`}
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceControl;
