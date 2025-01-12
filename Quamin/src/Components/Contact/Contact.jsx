import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
    const form = useRef();
    const [submitting, setSubmitting] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSubmitting(true);

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setSucceeded(true);
                    form.current.reset(); // Clear the form fields on success
                },
                () => {
                    setSubmitting(false);
                }
            )
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="contact">
            <div className="contact-col">
                <h3>
                    Send us a Message
                    <i className="fa-solid fa-message"></i>
                </h3>
                <p>
                    At Quamin, we deliver tailored IT solutions designed to meet
                    the specific needs of each client. With over two decades of
                    industry expertise, our founder, Manish K, leads a skilled
                    team specializing in cloud engineering, cybersecurity,
                    DevOps, generative AI, and database administration.
                </p>
                <ul>
                    <li>
                        <i className="fa-solid fa-envelope"></i>
                        info@quamin.in
                    </li>
                    <li>
                        <i className="fa-solid fa-phone"></i>
                        80-495749944
                    </li>
                    <li>
                        <i className="fa-solid fa-location-dot"></i>Shriram
                        Surabhi, Opp. KSSEM College, Mallasandra, Off Kanakpura
                        Road, Bengaluru - 560109
                    </li>
                    <li className="contactsocialiconsmobile">
                        <a
                            href="https://www.linkedin.com/company/quamin/posts/?feedView=all"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="linkedin"
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="facebook"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="github"
                        >
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a
                            href="https://www.youtube.com/@quamintech"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="youtube"
                        >
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="contact-col">
                <form ref={form} onSubmit={sendEmail}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
                    <label htmlFor="phone">Contact Number</label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your contact number"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email ID"
                        required
                    />
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        placeholder="Enter your message"
                        required
                    />
                    <button
                        className="btn"
                        type="submit"
                        disabled={submitting}
                        aria-label="submit"
                    >
                        Submit
                    </button>
                    {succeeded && (
                        <p className="successmsgcontact">
                            Form Submitted Successfully!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;
