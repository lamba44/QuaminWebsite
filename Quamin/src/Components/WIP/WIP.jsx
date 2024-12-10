import React from "react";
import { Link } from "react-router-dom";
import "./WIP.css";

const WIP = () => {
    return (
        <div className="WIP">
            <h1>Work In Progress</h1>
            <h2>Coming Soon!</h2>
            <Link to="/">
                <button className="btn">Back to Home</button>
            </Link>
        </div>
    );
};

export default WIP;
