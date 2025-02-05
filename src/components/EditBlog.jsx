import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "./Title";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const blogToEdit = blogs.find(blog => blog.id === parseInt(id));

        if (blogToEdit) {
            setTitle(blogToEdit.title);
            setContent(blogToEdit.content);
            setImage(blogToEdit.image);
        } else {
            navigate("/"); // Redirect if blog not found
        }
    }, [id, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const updatedBlogs = blogs.map(blog =>
            blog.id === parseInt(id) ? { ...blog, title, content, image } : blog
        );

        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
        navigate("/blogs"); // Redirect back to main page
    };

    return (
        <>
            <Title />
            <div className="max-w-lg mx-auto p-4">
                <h1 className="text-2xl mb-4">Edit Blog</h1>
                <form onSubmit={handleUpdate} className="space-y-4">
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
                    />
                    
                    {image && <img src={image} alt="Preview" className="mt-2 h-40 w-full object-cover"/>}

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Blog
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBlog;
