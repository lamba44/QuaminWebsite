import React from "react";
import "./Styling/BlogIndividual.css";
import sampleImg from "./../assets/blog-hero.webp";
import { useNavigate } from "react-router-dom";

const BlogIndividual = () => {
    const navigate = useNavigate();

    return (
        <div className="container indblogcontainer">
            <button
                onClick={() => navigate("/blogs")}
                className="btn indblogbackbtn"
            >
                Back
            </button>
            <h1 className="indblogtitle">
                Blog Title Goes Here, Should be Multiline like this
            </h1>
            <div className="blogmainimg">
                <img className="blogmainpic" src={sampleImg} alt="" />
            </div>
            <p className="indblogdesc">
                A long one liner description about what the blog has, or maybe
                just a one liner to attract someone to read the blog and click
                on it
            </p>
            <p className="indblogauthor">Mr. James Bond</p>
            <p className="indblogcategory">Technology, 25/12/2024</p>
            <p className="indblogcontent">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                harum dolorum pariatur quam molestias aliquam quidem labore
                ipsum cum officiis eum aperiam, voluptates, illo facere vero quo
                eligendi. Quia, velit. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Aut harum dolorum pariatur quam molestias
                aliquam quidem labore ipsum cum officiis eum aperiam,
                voluptates, illo facere vero quo eligendi. Quia, velit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Aut harum
                dolorum pariatur quam molestias aliquam quidem labore ipsum cum
                officiis eum aperiam, voluptates, illo facere vero quo eligendi.
                Quia, velit. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Aut harum dolorum pariatur quam molestias aliquam quidem
                labore ipsum cum officiis eum aperiam, voluptates, illo facere
                vero quo eligendi. Quia, velit. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aut harum dolorum pariatur quam
                molestias aliquam quidem labore ipsum cum officiis eum aperiam,
                voluptates, illo facere vero quo eligendi. Quia, velit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Aut harum
                dolorum pariatur quam molestias aliquam quidem labore ipsum cum
                officiis eum aperiam, voluptates, illo facere vero quo eligendi.
                Quia, velit. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Aut harum dolorum pariatur quam molestias aliquam quidem
                labore ipsum cum officiis eum aperiam, voluptates, illo facere
                vero quo eligendi. Quia, velit.
            </p>
        </div>
    );
};

export default BlogIndividual;
