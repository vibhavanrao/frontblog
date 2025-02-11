import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "./Title";
import axios from "axios";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch blog data from backend
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                const { title, content, image, author } = response.data;
                setTitle(title);
                setContent(content);
                setImage(image);
                setAuthor(author);
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError("Blog not found.");
                navigate("/"); // Redirect if blog not found
            }
        };
        fetchBlog();
    }, [id, navigate]);

    const handleImageChange = (e) => {
        const imageUrl = e.target.value.trim(); // Get the URL input
        if (imageUrl) {
            setImage(imageUrl); // Directly set the URL
        }
    };
    

    // Update blog in SQL database
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedBlog = { title, content, image, author };

        try {
            await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);
            navigate("/blogs"); // Redirect after update
        } catch (error) {
            console.error("Error updating blog:", error.response?.data || error.message);
            setError("Failed to update blog.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-amber-50 min-h-screen">
            <Title />
            <div className="max-w-lg mx-auto p-4">
                <h1 className="text-2xl mb-4">Edit Blog</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author Name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <textarea
                        placeholder="Blog Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows="5"
                        required
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Enter image URL"
                        value={image}
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="mt-2 h-40 w-full object-cover"
                        />
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
