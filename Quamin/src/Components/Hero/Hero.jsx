import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
    return (
        <div className="hero container">
            <div className="hero-text">
                <h1>Quamin Tech Solutions LLP</h1>
                <p>Where mind meets technology</p>
                <Link to="/blogs">
                    <button className="btn">Explore More</button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
