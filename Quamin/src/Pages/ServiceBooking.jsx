import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Components/Title/Title";
import "./Styling/ServiceBooking.css";

const ServiceBooking = () => {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]); // We'll fetch all bookings to hide taken slots

    // Selected fields
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Contact info
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // We'll store a success message here instead of using an alert
    const [successMessage, setSuccessMessage] = useState("");

    // We no longer store dummy bookedSlots array; we use real bookings from backend
    const [availableDates, setAvailableDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    // ----------------- FETCH SERVICES ----------------- //
    const fetchServices = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/services"
            );
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
        }
    };

    // ----------------- FETCH ALL BOOKINGS ----------------- //
    // Make sure this endpoint does NOT require admin token
    // if you want regular users to see booked slots.
    const fetchBookings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/bookings"
            );
            setBookings(response.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }
    };

    // ----------------- GENERATE WEEKDAYS ----------------- //
    const generateWeekdays = () => {
        const days = [];
        let current = new Date();
        let count = 0;
        while (count < 5) {
            current.setDate(current.getDate() + 1);
            // 0=Sunday, 6=Saturday => skip weekends
            if (current.getDay() !== 0 && current.getDay() !== 6) {
                days.push(new Date(current));
                count++;
            }
        }
        setAvailableDates(days);
    };

    // ----------------- GENERATE TIME SLOTS ----------------- //
    const generateTimeSlots = () => {
        const slots = [];
        let startHour = 8;
        const endHour = 17; // up to 5pm
        let minute = 0;

        while (startHour < endHour) {
            const hourStr = String(startHour).padStart(2, "0");
            const minuteStr = String(minute).padStart(2, "0");
            slots.push(`${hourStr}:${minuteStr}`);

            minute += 30;
            if (minute >= 60) {
                minute = 0;
                startHour++;
            }
        }
        setTimeSlots(slots);
    };

    useEffect(() => {
        fetchServices();
        fetchBookings(); // fetch all existing bookings to block taken slots
        generateWeekdays();
        generateTimeSlots();
    }, []);

    // ----------------- HELPER FUNCTIONS ----------------- //
    const formatDate = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (d) => {
        // e.g. "Mon, 13 Jan 2025"
        const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        return d.toLocaleDateString("en-US", options);
    };

    // If a booking exists for the same date/time (any service), mark slot as taken
    const isBooked = (date, time) => {
        return bookings.some((b) => b.date === date && b.time === time);
    };

    // ----------------- FORM SUBMISSION ----------------- //
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");

        if (!selectedService || !selectedDate || !selectedTime) {
            alert("Please select a service, date, and time slot.");
            return;
        }
        if (!name || !phone || !email) {
            alert("Please fill in your contact details.");
            return;
        }

        const bookingData = {
            name,
            phone,
            email,
            serviceId: selectedService,
            date: selectedDate,
            time: selectedTime,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/bookings",
                bookingData
            );
            if (response.status === 201) {
                // Show success message above button
                setSuccessMessage("Booking submitted successfully!");

                // After 5 seconds, redirect to "/"
                setTimeout(() => {
                    navigate("/");
                }, 5000);

                // Clear form fields
                setSelectedService("");
                setSelectedDate("");
                setSelectedTime("");
                setName("");
                setPhone("");
                setEmail("");
            }
        } catch (err) {
            console.error("Error submitting booking:", err);
            alert("Failed to submit booking. Please try again.");
        }
    };

    const handleDateSelection = (dateString) => {
        setSelectedDate(dateString);
        setSelectedTime("");
    };

    return (
        <div className="service-booking-page">
            <div className="container">
                <Title subTitle="Book Now" title="Select From Our Services" />
                <div className="homebtnblogs">
                    <button onClick={() => navigate("/")} className="btn">
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Show all services as cards at the top */}
            <div className="services-cards-container">
                {services.length === 0 ? (
                    <p style={{ marginLeft: "15px", fontStyle: "italic" }}>
                        No services available.
                    </p>
                ) : (
                    services.map((svc) => (
                        <div className="service-card" key={svc._id}>
                            <h3 className="service-card-name">{svc.name}</h3>
                            <p className="service-card-desc">
                                {svc.description}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="service-booking-container">
                <form onSubmit={handleSubmit} className="service-booking-form">
                    <h2 className="service-booking-heading">Book a Service</h2>

                    {/* CONTACT INFO */}
                    <div className="form-section">
                        <label htmlFor="user-name">Name*</label>
                        <input
                            id="user-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Your name"
                        />
                    </div>
                    <div className="form-section">
                        <label htmlFor="user-phone">Phone*</label>
                        <input
                            id="user-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Your phone number"
                        />
                    </div>
                    <div className="form-section">
                        <label htmlFor="user-email">Email*</label>
                        <input
                            id="user-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* SELECT SERVICE (Dropdown) */}
                    <div className="form-section">
                        <label htmlFor="service-select">Service*</label>
                        <select
                            id="service-select"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            required
                        >
                            <option value="">-- Select a Service --</option>
                            {services.map((svc) => (
                                <option key={svc._id} value={svc._id}>
                                    {svc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SELECT DATE */}
                    <div className="booking-schedule">
                        <h3 className="schedule-heading">Pick a Date</h3>
                        <div className="dates-row">
                            {availableDates.map((dObj) => {
                                const dateString = formatDate(dObj);
                                const displayDate = formatDisplayDate(dObj);
                                const isSelected = selectedDate === dateString;

                                return (
                                    <button
                                        key={dateString}
                                        type="button"
                                        className={`date-button ${
                                            isSelected
                                                ? "date-button-selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleDateSelection(dateString)
                                        }
                                    >
                                        {displayDate}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* TIME SLOTS */}
                    {selectedDate && (
                        <div className="time-slots-section">
                            <h3 className="schedule-heading">Pick a Time</h3>
                            <div className="time-slots-grid">
                                {timeSlots.map((slot) => {
                                    const booked = isBooked(selectedDate, slot);
                                    const isSelected = selectedTime === slot;

                                    return (
                                        <button
                                            key={`${selectedDate}-${slot}`}
                                            type="button"
                                            className={`slot-button ${
                                                booked
                                                    ? "slot-booked"
                                                    : isSelected
                                                    ? "slot-selected"
                                                    : ""
                                            }`}
                                            disabled={booked}
                                            onClick={() =>
                                                setSelectedTime(slot)
                                            }
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SUCCESS MESSAGE ABOVE BUTTON */}
                    {successMessage && (
                        <p
                            style={{
                                color: "green",
                                marginTop: "10px",
                                fontWeight: "500",
                            }}
                        >
                            {successMessage}
                        </p>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="btn booking-submit-btn">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ServiceBooking;
