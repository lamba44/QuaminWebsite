import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import App from "./App";
import JobApplication from "./Pages/JobApplication";
import ServiceBooking from "./Pages/ServiceBooking";
import NotFound404 from "./Pages/NotFound404";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/jobs" element={<JobApplication />} />
                <Route path="/services" element={<ServiceBooking />} />
                <Route path="/*" element={<NotFound404 />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
