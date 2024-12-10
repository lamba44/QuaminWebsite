import React from "react";
import Title from "../Components/Title/Title";
import WIP from "../Components/WIP/WIP";

const ServiceBooking = () => {
    return (
        <div>
            <div className="container">
                <Title subTitle="Book Now" title="Select From Our Services" />
                <WIP />
            </div>
        </div>
    );
};

export default ServiceBooking;
