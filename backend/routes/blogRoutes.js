// controllers/blogController.js
const express = require("express");
const Blog = require("../models/Blog");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new blog (protected route)
router.post("/create", verifyToken, async (req, res) => {
    const { title, category, image, description, author, content } = req.body;

    if (!title || !category || !image || !description || !author || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newBlog = new Blog({
            title,
            category,
            image,
            description,
            author,
            content,
        });
        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a blog by ID (protected route)
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
