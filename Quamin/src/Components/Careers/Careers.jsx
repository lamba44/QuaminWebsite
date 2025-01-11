import React from "react";
import { Link } from "react-router-dom";
import "./Careers.css";
import gallery_1 from "../../assets/careers_1.png";
import gallery_2 from "../../assets/careers_2.png";
import gallery_3 from "../../assets/careers_3.png";
import gallery_4 from "../../assets/careers_4.png";

const jobData = [
    {
        img: gallery_1,
        title: "Diversity Drives Innovation",
        description:
            "Be part of an inclusive workplace where diverse ideas lead to groundbreaking solutions.",
    },
    {
        img: gallery_2,
        title: "Learn from Industry Leaders",
        description:
            "Collaborate with experienced professionals and industry experts.",
    },
    {
        img: gallery_3,
        title: "Balanced Work-Life Culture",
        description:
            "Enjoy a flexible and balanced work environment that promotes well-being.",
    },
    {
        img: gallery_4,
        title: "Achieve Career Milestones",
        description:
            "Unlock opportunities to grow your career and achieve your professional goals.",
    },
];

const Careers = () => {
    return (
        <div className="careers">
            <div className="gallery">
                {jobData.map((job, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={job.img} alt={job.title} />
                        <div className="overlay">
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/jobs">
                <button className="btn blue-btn">Apply Now</button>
            </Link>
        </div>
    );
};

export default Careers;
