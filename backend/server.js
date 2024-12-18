// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Atlas connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// Admin schema
const adminSchema = new mongoose.Schema({
    username: String,
    password: String, // You should hash the password before storing it
});

const Admin = mongoose.model("Admin", adminSchema);

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Admin login route
app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;

    // Check if the username and password are correct (for now, it's hardcoded for simplicity)
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1h" });

    // Send the token in the response
    res.json({ token });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res
            .status(403)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Protected route for admin dashboard
app.get("/api/admin/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
