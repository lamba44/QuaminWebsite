import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styling/BlogControl.css";
import Title from "../Components/Title/Title";

const BlogControl = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(""); // URL input for the image
    const [date, setDate] = useState(""); // State for the date
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Fetch existing blogs from the server
    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/blogs");
            if (!response.ok) {
                throw new Error("Failed to fetch blogs.");
            }
            const data = await response.json();
            console.log("Fetched blogs:", data);
            setBlogs(data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError(err.message || "Failed to fetch blogs.");
        }
    };

    // Handle adding a new blog
    const handleAddBlog = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate required fields
        if (
            !title ||
            !category ||
            !author ||
            !description ||
            !content ||
            !date ||
            !image
        ) {
            setError("All fields are required.");
            return;
        }

        const formData = {
            title: title.trim(),
            category: category.trim(),
            author: author.trim(),
            description: description.trim(),
            content: content.trim(),
            date,
            image,
        };

        console.log("Payload to be sent:", formData);

        try {
            const response = await fetch("http://localhost:5000/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Blog added successfully:", data);
                setSuccess("Blog added successfully.");
                fetchBlogs(); // Refresh the blog list
                resetForm();
            } else {
                const data = await response.json();
                console.error("Error adding blog:", data);
                setError(data.message || "Failed to add blog.");
            }
        } catch (err) {
            console.error("Network error while adding blog:", err);
            setError(err.message || "Failed to add blog.");
        }
    };

    // Handle deleting a blog
    const handleDeleteBlog = async (id) => {
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(
                `http://localhost:5000/api/blogs/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "jwtToken"
                        )}`,
                    },
                }
            );

            if (response.ok) {
                console.log("Blog deleted successfully:", id);
                setSuccess("Blog deleted successfully.");
                fetchBlogs(); // Refresh the blog list
            } else {
                const data = await response.json();
                console.error("Error deleting blog:", data);
                setError(data.message || "Failed to delete blog.");
            }
        } catch (err) {
            console.error("Network error while deleting blog:", err);
            setError(err.message || "Failed to delete blog.");
        }
    };

    // Reset all form fields
    const resetForm = () => {
        setTitle("");
        setCategory("");
        setAuthor("");
        setDescription("");
        setContent("");
        setImage("");
        setDate("");
        console.log("Form reset.");
    };

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            <Title subTitle="Add/Remove Blogs here" title="Blogs Control" />

            <div className="goingbackbtnadmin">
                <button
                    className="btn gobackbtn"
                    type="button"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    Go Back
                </button>
            </div>

            <form className="addblog" onSubmit={handleAddBlog}>
                <input
                    className="addbloginput"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    className="addbloginput"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    className="addbloginput"
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <textarea
                    className="addblogtextarea"
                    placeholder="One-liner Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <textarea
                    className="addblogtextarea"
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <input
                    className="addbloginput"
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <input
                    className="addbloginput"
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button className="btn addblogbtn" type="submit">
                    Add Blog
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <p className="blogslistheader">Existing Blogs:</p>
            {blogs.length === 0 ? (
                <p className="noblogs">No blogs available.</p>
            ) : (
                <ul className="blogslist">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="bloglistitem">
                            <span className="remblogtitle">{blog.title}</span>
                            <button
                                className="blogremovebtn"
                                onClick={() => handleDeleteBlog(blog._id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogControl;
