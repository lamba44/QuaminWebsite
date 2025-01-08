import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../Components/Title/Title";
import "./Styling/JobApplication.css";

const JobApplication = () => {
    const navigate = useNavigate();

    // State for the available jobs
    const [jobs, setJobs] = useState([]);

    // Form field states
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [resumeLink, setResumeLink] = useState("");
    const [position, setPosition] = useState("");
    const [message, setMessage] = useState("");

    // UI feedback
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch available jobs from server on mount
    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/jobs");
            setJobs(response.data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!name || !phone || !email || !address || !resumeLink || !position) {
            setError("Please fill in all required fields before submitting.");
            return;
        }

        const formData = {
            name,
            phone,
            email,
            address,
            resumeLink,
            position, // This should match the 'job._id'
            message,
        };

        try {
            // POST to your backend to create a new Applicant
            const response = await axios.post(
                "http://localhost:5000/api/applicants",
                formData
            );

            if (response.status === 201) {
                setSuccess("Your application has been submitted successfully!");
                // Reset form fields
                setName("");
                setPhone("");
                setEmail("");
                setAddress("");
                setResumeLink("");
                setPosition("");
                setMessage("");
            }
        } catch (err) {
            console.error("Error submitting application:", err);
            setError(
                err.response?.data?.message ||
                    "Failed to submit your application."
            );
        }
    };

    return (
        <div className="job-application-page">
            <div className="container">
                <Title subTitle="Careers" title="Join Our Team" />
                <div className="homebtnblogs">
                    <button onClick={() => navigate("/")} className="btn">
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Section to display available jobs */}
            <div className="available-jobs-section">
                <h2 className="jobs-heading">Available Positions</h2>
                {jobs.length === 0 ? (
                    <p className="no-jobs-text">
                        No jobs available at the moment.
                    </p>
                ) : (
                    <ul className="jobs-list">
                        {jobs.map((job) => (
                            <li key={job._id} className="job-item">
                                <h3 className="job-title">{job.title}</h3>
                                <p className="job-description">
                                    {job.description}
                                </p>
                                {/* You can also show more details like location, etc. */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form to apply for a job */}
            <div className="application-form-section">
                <h2 className="apply-heading">Apply Now</h2>

                {/* Display errors or success messages */}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form className="job-application-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="applicant-name">Name*</label>
                        <input
                            type="text"
                            id="applicant-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="applicant-phone">Phone*</label>
                        <input
                            type="tel"
                            id="applicant-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Your phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="applicant-email">Email*</label>
                        <input
                            type="email"
                            id="applicant-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="applicant-address">Address*</label>
                        <input
                            type="text"
                            id="applicant-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Your current address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="resume-link">Resume (Link)*</label>
                        <input
                            type="text"
                            id="resume-link"
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                            required
                            placeholder="Google Drive or any online link"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="job-position">
                            Position Applying For*
                        </label>
                        {/* Example: Dropdown with job IDs or titles */}
                        <select
                            id="job-position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        >
                            <option value="">-- Select a position --</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>
                                    {job.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="optional-message">
                            Message (Optional)
                        </label>
                        <textarea
                            id="optional-message"
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us anything else you want us to know..."
                        ></textarea>
                    </div>

                    {/* Submit Application button INSIDE the form */}
                    <button type="submit" className="btn">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobApplication;
