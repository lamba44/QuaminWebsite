// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    resumeLink: { type: String, required: true },
    message: { type: String }, // Optional
    jobApplied: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // Points to the Job model
        required: true,
    },
    dateApplied: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Applicant", applicantSchema);
