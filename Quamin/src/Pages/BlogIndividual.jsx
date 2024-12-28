import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Styling/BlogIndividual.css";

const BlogIndividual = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/blogs/${id}`
                );
                setBlog(response.data);
            } catch (err) {
                console.error("Error fetching blog:", err);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <p>Loading...</p>;

    return (
        <div className="container indblogcontainer">
            <button
                onClick={() => navigate("/blogs")}
                className="btn indblogbackbtn"
            >
                Back
            </button>
            <h1 className="indblogtitle">{blog.title}</h1>
            <div className="blogmainimg">
                <img
                    className="blogmainpic"
                    src={blog.image}
                    alt={blog.title}
                />
            </div>
            <p className="indblogdesc">{blog.description}</p>
            <p className="indblogauthor">{blog.author}</p>
            <p className="indblogcategory">{`${blog.category}, ${new Date(
                blog.date
            ).toLocaleDateString()}`}</p>
            <p className="indblogcontent">{blog.content}</p>
        </div>
    );
};

export default BlogIndividual;
