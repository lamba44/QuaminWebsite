import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Styling/BlogHome.css";
import Title from "../Components/Title/Title";

const BlogHome = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/blogs"
                );

                // Sort the blogs in descending order by date (latest first)
                const sortedBlogs = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                setBlogs(sortedBlogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchBlogs();
    }, []);

    // Helper function to format dates as DD Mon YYYY
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

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
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="blogcard"
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                        >
                            <div className="blogcardimg">
                                <img
                                    className="blogcardpic"
                                    src={blog.image}
                                    alt={blog.title}
                                />
                            </div>
                            <div className="blogcardinfo">
                                <p className="blogcategory">{blog.category}</p>
                                <p className="blogtitle">{blog.title}</p>
                                <p className="blogauthor">{blog.author}</p>
                                <p className="blogdesc">{blog.description}</p>
                                <p className="blogdate">
                                    {formatDate(blog.date)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogHome;
