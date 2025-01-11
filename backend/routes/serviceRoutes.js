// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import the verifyToken middleware if you want to protect certain routes
const { verifyToken } = require("../middleware/authMiddleware");

// Models
const Service = require("../models/Service");
const Booking = require("../models/Booking");

/* -------------------- SERVICES -------------------- */

// @route   GET /api/services
// @desc    Fetch all services (public)
router.get("/services", async (req, res) => {
    try {
        const services = await Service.find().sort({ dateCreated: -1 });
        res.json(services);
    } catch (err) {
        console.error("Error fetching services:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/services
// @desc    Add a new service (admin-only)
router.post("/services", verifyToken, async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res
            .status(400)
            .json({ message: "Service name and description are required." });
    }

    try {
        const newService = new Service({ name, description });
        await newService.save();
        res.status(201).json({ message: "Service created successfully" });
    } catch (err) {
        console.error("Error creating service:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service (admin-only)
router.delete("/services/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({ message: "Service deleted successfully" });
    } catch (err) {
        console.error("Error deleting service:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* -------------------- BOOKINGS -------------------- */

// @route   GET /api/bookings
// @desc    Fetch all bookings
// CHANGED: remove verifyToken so it’s public, allowing the user
// to check which dates/times are already taken.
router.get("/bookings", async (req, res) => {
    try {
        // Populate the `service` field to get service name/desc
        const bookings = await Booking.find().populate("service");
        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/bookings
// @desc    Submit a new booking (public)
router.post("/bookings", async (req, res) => {
    const { name, phone, email, serviceId, date, time } = req.body;

    if (!name || !phone || !email || !serviceId || !date || !time) {
        return res
            .status(400)
            .json({ message: "Missing required fields for booking." });
    }

    try {
        const booking = new Booking({
            name,
            phone,
            email,
            service: serviceId,
            date,
            time,
            status: "Pending",
        });
        await booking.save();

        res.status(201).json({ message: "Booking created successfully" });
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   PATCH /api/bookings/:id
// @desc    Update booking status (admin-only)
router.patch("/bookings/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status provided." });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking status updated", updatedBooking });
    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
