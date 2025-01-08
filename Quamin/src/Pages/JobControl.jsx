import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styling/JobControl.css";
import Title from "../Components/Title/Title";

const JobControl = () => {
    // States for Jobs and Applicants
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);

    // Form fields for adding a new job
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");

    // UI feedback
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Retrieve token from localStorage
    const token = localStorage.getItem("jwtToken");
    // Make sure you actually store the raw JWT in localStorage on admin login

    // Fetch existing jobs (public route, no token needed)
    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/jobs");
            setJobs(response.data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setError(err.response?.data?.message || "Failed to fetch jobs.");
        }
    };

    // Fetch applicants (protected route, needs token)
    const fetchApplicants = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/applicants",
                {
                    headers: {
                        Authorization: token, // Pass token directly
                    },
                }
            );
            setApplicants(response.data);
        } catch (err) {
            console.error("Error fetching applicants:", err);
            setError(
                err.response?.data?.message || "Failed to fetch applicants."
            );
        }
    };

    // Fetch both on component mount
    useEffect(() => {
        fetchJobs();
        fetchApplicants();
        // eslint-disable-next-line
    }, []);

    // Handle adding a new job (protected route, needs token)
    const handleAddJob = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Simple validation
        if (!title || !description || !requirements || !location) {
            setError("Please fill in all required fields for the job.");
            return;
        }

        const newJob = {
            title,
            description,
            requirements,
            location,
            salary,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/jobs",
                newJob,
                {
                    headers: {
                        Authorization: token, // Pass token here
                    },
                }
            );
            if (response.status === 201) {
                setSuccess("Job added successfully.");
                fetchJobs(); // Refresh job list
                resetForm();
            }
        } catch (err) {
            console.error("Error adding job:", err);
            setError(err.response?.data?.message || "Failed to add job.");
        }
    };

    // Handle deleting a job (protected route, needs token)
    const handleDeleteJob = async (id) => {
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/jobs/${id}`,
                {
                    headers: {
                        Authorization: token, // Pass token here
                    },
                }
            );
            if (response.status === 200) {
                setSuccess("Job deleted successfully.");
                fetchJobs();
            }
        } catch (err) {
            console.error("Error deleting job:", err);
            setError(err.response?.data?.message || "Failed to delete job.");
        }
    };

    // Clear form fields
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setRequirements("");
        setLocation("");
        setSalary("");
    };

    return (
        <div className="job-control-page">
            <Title
                subTitle="Control Open Positions and Applications"
                title="Careers Control"
            />

            <div className="job-control-container">
                {/* Display errors or success messages */}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {/* Add New Job Form */}
                <div className="add-job-section">
                    <h2 className="section-heading">Add a New Job</h2>
                    <form className="add-job-form" onSubmit={handleAddJob}>
                        <div className="form-group">
                            <label htmlFor="job-title">Title*</label>
                            <input
                                type="text"
                                id="job-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="e.g. Frontend Developer"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="job-description">
                                Description*
                            </label>
                            <textarea
                                id="job-description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder="Brief details about the position..."
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="job-requirements">
                                Requirements*
                            </label>
                            <textarea
                                id="job-requirements"
                                rows="3"
                                value={requirements}
                                onChange={(e) =>
                                    setRequirements(e.target.value)
                                }
                                required
                                placeholder="Skills, experience, etc."
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="job-location">Location*</label>
                            <input
                                type="text"
                                id="job-location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                placeholder="e.g. Remote / City, State"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="job-salary">
                                Salary (Optional)
                            </label>
                            <input
                                type="text"
                                id="job-salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="e.g. $60,000 - $80,000"
                            />
                        </div>

                        <button type="submit" className="btn add-job-btn">
                            Add Job
                        </button>
                    </form>
                </div>

                {/* Existing Jobs List */}
                <div className="existing-jobs-section">
                    <h2 className="section-heading">Existing Jobs</h2>
                    {jobs.length === 0 ? (
                        <p className="no-jobs">No jobs are currently listed.</p>
                    ) : (
                        <ul className="jobs-list">
                            {jobs.map((job) => (
                                <li key={job._id} className="job-list-item">
                                    <div className="job-details">
                                        <p className="job-title">{job.title}</p>
                                        <p className="job-location">
                                            <strong>Location:</strong>{" "}
                                            {job.location}
                                        </p>
                                        {job.salary && (
                                            <p className="job-salary">
                                                <strong>Salary:</strong>{" "}
                                                {job.salary}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        className="remove-job-btn"
                                        onClick={() => handleDeleteJob(job._id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Applicants Section */}
                <div className="applicants-section">
                    <h2 className="section-heading">All Applicants</h2>
                    {applicants.length === 0 ? (
                        <p className="no-applicants">
                            No applications received yet.
                        </p>
                    ) : (
                        <table className="applicants-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Position</th>
                                    <th>Resume Link</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((app) => (
                                    <tr key={app._id}>
                                        <td>{app.name}</td>
                                        <td>{app.phone}</td>
                                        <td>{app.email}</td>
                                        <td>{app.address}</td>
                                        <td>{app.jobApplied?.title || "—"}</td>
                                        <td>
                                            <a
                                                href={app.resumeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        </td>
                                        <td>{app.message || "—"}</td>
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

export default JobControl;
