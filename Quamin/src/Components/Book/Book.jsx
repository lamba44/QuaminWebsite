import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";
import book_img from "../../assets/book_img.webp";

const Book = () => {
    return (
        <div className="book">
            <div className="book-left">
                <img src={book_img} alt="" className="book_img" />
            </div>
            <div className="book-right">
                <h3>OUR SERVICES</h3>
                <h2>Comprehensive IT Consulting</h2>
                <p>
                    At Quamin Tech Solutions LLP, we offer expert IT strategy
                    consulting to align your IT infrastructure with business
                    objectives, alongside tailored cloud computing services to
                    enhance efficiency and innovation. Our cybersecurity
                    consulting services provide robust protection against cyber
                    threats, ensuring the security of your critical assets and
                    data.
                </p>
                <p>
                    We empower clients with data analytics consulting, utilizing
                    advanced data techniques to drive growth and innovation.
                    Additionally, our managed IT services streamline operations
                    and reduce costs, providing day-to-day support and strategic
                    planning.
                </p>
                <p>
                    Our digital transformation consulting guides businesses
                    through the evolving digital landscape, offering expertise
                    in digital strategy and customer experience design to foster
                    growth and innovation.
                </p>
                <Link to="/services">
                    <button className="btn blue-btn">Book Now</button>
                </Link>
            </div>
        </div>
    );
};

export default Book;
