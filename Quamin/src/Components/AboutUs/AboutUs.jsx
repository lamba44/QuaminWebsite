import React, { useState } from "react";
import "./AboutUs.css";
import about_1 from "../../assets/about_1.webp";
import about_2 from "../../assets/about_2.webp";
import about_3 from "../../assets/about_3.webp";
import about_icon_1 from "../../assets/about_icon_1.webp";
import about_icon_2 from "../../assets/about_icon_2.webp";
import about_icon_3 from "../../assets/about_icon_3.webp";

const AboutUs = () => {
    const [visibleIndex, setVisibleIndex] = useState(null);

    const toggleVisibility = (index) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    return (
        <div className="aboutus">
            <div className="about" onClick={() => toggleVisibility(0)}>
                <img src={about_1} alt="" />
                <div className={`caption ${visibleIndex === 0 ? "show" : ""}`}>
                    {visibleIndex === 0 ? (
                        <p>
                            Our Mission
                            <br />
                            At Quamin, our mission is to deliver exceptional IT
                            services tailored to both small and large
                            businesses. We aim to harness technology to empower
                            our clients, ensuring it serves their needs
                            effectively. Our focus includes IT software
                            development, with a specialization in AI/ML.
                        </p>
                    ) : (
                        <>
                            <img src={about_icon_1} alt="" />
                            <h3>Our Mission</h3>
                        </>
                    )}
                </div>
            </div>
            <div className="about" onClick={() => toggleVisibility(1)}>
                <img src={about_2} alt="" />
                <div className={`caption ${visibleIndex === 1 ? "show" : ""}`}>
                    {visibleIndex === 1 ? (
                        <p>
                            Our Expertise
                            <br />
                            Our team of seasoned IT professionals brings a
                            wealth of expertise across various domains,
                            including cybersecurity, cloud computing, and
                            AI/ML-driven network solutions.
                        </p>
                    ) : (
                        <>
                            <img src={about_icon_2} alt="" />
                            <h3>Our Expertise</h3>
                        </>
                    )}
                </div>
            </div>
            <div className="about" onClick={() => toggleVisibility(2)}>
                <img src={about_3} alt="" />
                <div className={`caption ${visibleIndex === 2 ? "show" : ""}`}>
                    {visibleIndex === 2 ? (
                        <p>
                            Our Approach
                            <br />
                            We adopt a personalized approach to every client,
                            collaborating closely to understand their specific
                            challenges and crafting customized solutions that
                            meet their unique needs.
                        </p>
                    ) : (
                        <>
                            <img src={about_icon_3} alt="" />
                            <h3>Our Approach</h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
