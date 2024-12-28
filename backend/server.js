// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
});

const Admin = mongoose.model("Admin", adminSchema);

// Import the Blog model
const Blog = require("./models/Blog");

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Admin login route
app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

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

// Fetch all admins
app.get("/api/admin/all", verifyToken, async (req, res) => {
    try {
        const admins = await Admin.find({}, { password: 0 }); // Exclude passwords
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new admin
app.post("/api/admin/create", verifyToken, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete an admin
app.delete("/api/admin/delete/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Prevent deletion of the currently logged-in admin (optional safeguard)
        if (req.adminId === id) {
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
        res.status(500).json({ message: "Server error" });
    }
});

// --------------------------- BLOG FUNCTIONALITY --------------------------- //

// Fetch all blogs
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new blog
app.post("/api/blogs", verifyToken, async (req, res) => {
    const { title, category, imageUrl, oneLiner, author, content, date } =
        req.body;

    if (!title || !category || !imageUrl || !oneLiner || !author || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newBlog = new Blog({
            title,
            category,
            imageUrl,
            oneLiner,
            author,
            content,
            date: date || new Date(),
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a blog
app.delete("/api/blogs/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch a single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id); // MongoDB's findById method
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// -------------------------------------------------------------------------- //

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
