import React from "react";
import "./Testimonials.css";
import user_1 from "../../assets/jojyjoseph.webp";
import user_2 from "../../assets/sudhanshutripathi.webp";
import user_3 from "../../assets/ranjansrivastva.webp";
import user_4 from "../../assets/sudhirk.webp";

const testimonialsData = [
    {
        img: user_1,
        name: "Jojy Joseph",
        title: "Director, Aspire Fire & Safety",
        feedback:
            "I have had the pleasure of working with Quamin Tech Solutions LLP, and I must say, their expertise and professionalism are top-notch. Their team delivered exceptional results, exceeding our expectations in terms of quality, timelines, and budget. I highly recommend Quamin Tech Solutions LLP to anyone seeking innovative, reliable, and high-quality tech solutions.",
    },
    {
        img: user_2,
        name: "Sudhanshu Tripathi",
        title: "Senior DevOps Manager",
        feedback:
            "I've had the pleasure of collaborating with Quamin Tech Solutions LLP on several projects, and their expertise in AI-powered solutions has been instrumental in driving innovation at my organisation. Their team's ability to understand our complex requirements, design tailored solutions, and deliver high-quality results has been impressive.",
    },
    {
        img: user_3,
        name: "Ranjan Srivastva",
        title: "General Manager, KI Mobility Solution Pvt. Ltd.",
        feedback:
            "I was blown away by the exceptional service and expertise provided by Quamin Tech Solutions LLP. Their team helped us implement a customized solution that streamlined our operations and improved efficiency. The level of professionalism, attention to detail, and dedication to customer satisfaction was outstanding.",
    },
    {
        img: user_4,
        name: "Sudhir K.",
        title: "Bengaluru, India",
        feedback:
            "I've worked with Quamin Tech Solutions LLP and found their services to be satisfactory. They provided a solution that met my IT requirements and helped me achieve my goals. Their team was responsive and addressed my concerns in a timely manner. Overall, my experience with Quamin Tech Solutions LLP was positive.",
    },
];

const Testimonials = () => {
    return (
        <div className="testimonials-section testimonials">
            <div className="testimonials-grid">
                {testimonialsData.map((testimonial, index) => (
                    <div className="testimonial-card" key={index}>
                        <div className="testimonial-header">
                            <img
                                src={testimonial.img}
                                alt={testimonial.name}
                                className="testimonial-img"
                            />
                            <div>
                                <h3 className="testimonial-name">
                                    {testimonial.name}
                                </h3>
                                <p className="testimonial-title">
                                    {testimonial.title}
                                </p>
                            </div>
                        </div>
                        <p className="testimonial-feedback">
                            {testimonial.feedback}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
