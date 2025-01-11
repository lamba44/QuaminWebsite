const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel"); // Assuming you have an Admin model
const { login } = require("../controllers/adminController");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Admin login route
router.post("/login", login);

// Fetch all admins
router.get("/all", verifyToken, async (req, res) => {
    try {
        const admins = await Admin.find({}, { password: 0 }); // Exclude passwords
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Add a new admin
router.post("/create", verifyToken, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "All fields are required" });

    try {
        // Check if username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin)
            return res.status(400).json({ message: "Admin already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete an admin
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent deletion of the currently logged-in admin (optional safeguard)
        if (req.admin.id === id) {
            return res
                .status(400)
                .json({ message: "You cannot delete yourself" });
        }

        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.json({ message: "Admin deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
