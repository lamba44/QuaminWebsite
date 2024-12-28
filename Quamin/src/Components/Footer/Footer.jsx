import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <p>
                © 2024 <Link to="/admin">Quamin</Link> Tech Solutions LLP. All
                Rights Reserved.
            </p>
            <ul>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
    );
};

export default Footer;
