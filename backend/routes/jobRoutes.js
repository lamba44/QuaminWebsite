// routes/jobRoutes.js
const express = require("express");
const router = express.Router();

// Import the verifyToken middleware from your middleware folder
const { verifyToken } = require("../middleware/authMiddleware");

// Import Models
const Job = require("../models/Job");
const Applicant = require("../models/Applicant");

/* --------------------------- JOB ROUTES --------------------------- */

// @route   GET /api/jobs
// @desc    Fetch all jobs (public)
router.get("/jobs", async (req, res) => {
    try {
        // Sort jobs by datePosted descending so newest jobs appear first
        const jobs = await Job.find().sort({ datePosted: -1 });
        res.json(jobs);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/jobs
// @desc    Add a new job (admin-only)
router.post("/jobs", verifyToken, async (req, res) => {
    const { title, description, requirements, location, salary } = req.body;

    if (!title || !description || !requirements || !location) {
        return res
            .status(400)
            .json({ message: "Please fill in the required fields." });
    }

    try {
        const newJob = new Job({
            title,
            description,
            requirements,
            location,
            salary,
        });
        await newJob.save();
        res.status(201).json({ message: "Job created successfully" });
    } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job (admin-only)
router.delete("/jobs/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        console.error("Error deleting job:", err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ------------------------- APPLICANT ROUTES ------------------------- */

// @route   POST /api/applicants
// @desc    Submit an application (public)
router.post("/applicants", async (req, res) => {
    const {
        name,
        phone,
        email,
        address,
        resumeLink,
        position, // This will be the job._id
        message,
    } = req.body;

    if (!name || !phone || !email || !address || !resumeLink || !position) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const applicant = new Applicant({
            name,
            phone,
            email,
            address,
            resumeLink,
            message,
            jobApplied: position, // references the Job document
        });
        await applicant.save();
        res.status(201).json({ message: "Application submitted" });
    } catch (err) {
        console.error("Error creating applicant:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   GET /api/applicants
// @desc    Fetch all applicants (admin-only)
router.get("/applicants", verifyToken, async (req, res) => {
    try {
        // Populate the 'jobApplied' field so we can see the job title, etc.
        const applicants = await Applicant.find().populate("jobApplied");
        res.json(applicants);
    } catch (err) {
        console.error("Error fetching applicants:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
