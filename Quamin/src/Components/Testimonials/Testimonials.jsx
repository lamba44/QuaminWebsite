import React, { useRef } from "react";
import "./Testimonials.css";
import next_icon from "../../assets/next_icon.webp";
import back_icon from "../../assets/back_icon.webp";
import user_1 from "../../assets/user-1.webp";
import user_2 from "../../assets/user-2.webp";
import user_3 from "../../assets/user-3.webp";
import user_4 from "../../assets/user-4.webp";

const Testimonials = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if (tx > -50) {
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };
    const slideBackward = () => {
        if (tx < 0) {
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    return (
        <div className="testimonials">
            <img
                src={next_icon}
                alt="next item"
                className="next-btn"
                onClick={slideForward}
            />
            <img
                src={back_icon}
                alt="previous item"
                className="back-btn"
                onClick={slideBackward}
            />
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_1} alt="user 1" />
                                <div>
                                    <h3>William Bowery</h3>
                                    <span>Independent Songwriter, UK</span>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit animi assumenda in
                                architecto quia ratione amet veritatis facilis
                                tempore ducimus fugit sequi nulla nam harum
                                delectus sint aliquam, natus pariatur?
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="user 2" />
                                <div>
                                    <h3>Jack Antonoff</h3>
                                    <span>LMN Tech, USA</span>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit animi assumenda in
                                architecto quia ratione amet veritatis facilis
                                tempore ducimus fugit sequi nulla nam harum
                                delectus sint aliquam, natus pariatur?
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="user 3" />
                                <div>
                                    <h3>Nils Sjöberg</h3>
                                    <span>Independent Songwriter, USA</span>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit animi assumenda in
                                architecto quia ratione amet veritatis facilis
                                tempore ducimus fugit sequi nulla nam harum
                                delectus sint aliquam, natus pariatur?
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_4} alt="user 4" />
                                <div>
                                    <h3>Travis Kelce</h3>
                                    <span>Kansas City Chiefs, USA</span>
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Velit animi assumenda in
                                architecto quia ratione amet veritatis facilis
                                tempore ducimus fugit sequi nulla nam harum
                                delectus sint aliquam, natus pariatur?
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Testimonials;
