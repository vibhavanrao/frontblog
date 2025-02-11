import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import axios from "axios";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.value.trim());
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newBlog = { title, author, image, content };

        try {
            await axios.post("http://localhost:5000/api/blogs", newBlog);
            navigate("/blogs"); // Redirect to the blogs page after adding
        } catch (error) {
            console.error("Error adding blog:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-amber-50 min-h-screen">
            <Title />
            <div className="max-w-lg mx-auto p-4">
                <h1 className="text-2xl mb-4">Add a New Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {image && <img src={image} alt="preview" className="w-full mt-2" />}
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
