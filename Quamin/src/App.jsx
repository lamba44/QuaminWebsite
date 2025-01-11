import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import AboutUs from "./Components/AboutUs/AboutUs";
import Title from "./Components/Title/Title";
import Book from "./Components/Book/Book";
import Careers from "./Components/Careers/Careers";
import Testimonials from "./Components/Testimonials/Testimonials";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Partners from "./Components/Partners/Partners";

const App = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <div className="container">
                <Title subTitle="Partners" title="Synergy in Action" />
                <Partners />
                <Title subTitle="About Us" title="Who We Are" />
                <AboutUs />
                <Book />
                <Title subTitle="Careers" title="Join Our Team" />
                <Careers />
                <Title subTitle="Testimonials" title="What Our Clients Say" />
                <Testimonials />
                <Title subTitle="Contact Us" title="Get In Touch" />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default App;
