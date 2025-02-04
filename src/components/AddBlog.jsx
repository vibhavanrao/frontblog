import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("null");
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result); // Save Base64 string
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const newBlog = { id: Date.now(), title, image, content };
        localStorage.setItem("blogs", JSON.stringify([...existingBlogs, newBlog]));
        console.log("New Blog Added:", newBlog);
        navigate("/");
    };

    return (
        <>
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
                    <textarea
                        placeholder="Blog Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows="5"
                        required
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                        required
                    ></input>

                    {image && (<img src={image} alt="preview"/>)}
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Submit Blog
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBlog;