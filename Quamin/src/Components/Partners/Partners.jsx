import React from "react";
import "./Partners.css";
import microsoftParter from "./../../assets/MicrosoftLogo.webp";
import E2EParter from "./../../assets/E2EBlackLogo.webp";

const Partners = () => {
    return (
        <div className="ourpartners">
            <div className="partnerlogocontainer">
                <img className="partnerlogo" src={microsoftParter} alt="" />
            </div>
            <div className="partnerlogocontainer">
                <img className="partnerlogo" src={E2EParter} alt="" />
            </div>
        </div>
    );
};

export default Partners;
