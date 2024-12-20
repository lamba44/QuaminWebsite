import React from "react";
import "./Styling/BlogHome.css";
import Title from "../Components/Title/Title";
import { useNavigate } from "react-router-dom";
import blogSampleImg from "./../assets/about_3.webp";
import blogSampleImg2 from "./../assets/blog-hero.webp";

const BlogHome = () => {
    const navigate = useNavigate();

    return (
        <>
            <Title subTitle="Read our latest posts" title="Blogs" />
            <div className="homebtnblogs">
                <button onClick={() => navigate("/")} className="btn">
                    Back to Home
                </button>
            </div>
            <div className="container">
                <div className="bloggrid">
                    <div className="blogcard">
                        <div className="blogcardimg">
                            <img
                                className="blogcardpic"
                                src={blogSampleImg}
                                alt=""
                            />
                        </div>
                        <div className="blogcardinfo">
                            <p className="blogcategory">Technology</p>
                            <p className="blogtitle">
                                Blog Title Goes Here, Should be Multiline like
                                this
                            </p>
                            <p className="blogauthor">Mr. James Bond</p>
                            <p className="blogdesc">
                                A long one liner description about what the blog
                                has, or maybe just a one liner to attract
                                someone to read the blog and click on it
                            </p>
                            <p className="blogdate">25/12/2024</p>
                        </div>
                    </div>
                    <div className="blogcard">
                        <div className="blogcardimg">
                            <img
                                className="blogcardpic"
                                src={blogSampleImg2}
                                alt=""
                            />
                        </div>
                        <div className="blogcardinfo">
                            <p className="blogcategory">AI/ML</p>
                            <p className="blogtitle">
                                Blog Title Goes Here, Should be Multiline like
                                this
                            </p>
                            <p className="blogauthor">Mr. James Bond</p>
                            <p className="blogdesc">
                                A long one liner description about what the blog
                                has, or maybe just a one liner to attract
                                someone to read the blog and click on it
                            </p>
                            <p className="blogdate">25/12/2024</p>
                        </div>
                    </div>
                    <div className="blogcard">
                        <div className="blogcardimg">
                            <img
                                className="blogcardpic"
                                src={blogSampleImg2}
                                alt=""
                            />
                        </div>
                        <div className="blogcardinfo">
                            <p className="blogcategory">AI/ML</p>
                            <p className="blogtitle">
                                Blog Title Goes Here, Should be Multiline like
                                this
                            </p>
                            <p className="blogauthor">Mr. James Bond</p>
                            <p className="blogdesc">
                                A long one liner description about what the blog
                                has, or maybe just a one liner to attract
                                someone to read the blog and click on it
                            </p>
                            <p className="blogdate">25/12/2024</p>
                        </div>
                    </div>
                    <div className="blogcard">
                        <div className="blogcardimg">
                            <img
                                className="blogcardpic"
                                src={blogSampleImg2}
                                alt=""
                            />
                        </div>
                        <div className="blogcardinfo">
                            <p className="blogcategory">AI/ML</p>
                            <p className="blogtitle">
                                Blog Title Goes Here, Should be Multiline like
                                this
                            </p>
                            <p className="blogauthor">Mr. James Bond</p>
                            <p className="blogdesc">
                                A long one liner description about what the blog
                                has, or maybe just a one liner to attract
                                someone to read the blog and click on it
                            </p>
                            <p className="blogdate">25/12/2024</p>
                        </div>
                    </div>
                    <div className="blogcard">
                        <div className="blogcardimg">
                            <img
                                className="blogcardpic"
                                src={blogSampleImg2}
                                alt=""
                            />
                        </div>
                        <div className="blogcardinfo">
                            <p className="blogcategory">AI/ML</p>
                            <p className="blogtitle">
                                Blog Title Goes Here, Should be Multiline like
                                this
                            </p>
                            <p className="blogauthor">Mr. James Bond</p>
                            <p className="blogdesc">
                                A long one liner description about what the blog
                                has, or maybe just a one liner to attract
                                someone to read the blog and click on it
                            </p>
                            <p className="blogdate">25/12/2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogHome;
