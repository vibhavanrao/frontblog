import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { View, Pencil } from "lucide-react";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="min-h-screen w-full p-4 bg-gray-200">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p>- by {blog.author}</p>
      {blog.image && (
        <img className="justify-items-center w-150 mx-auto" src={blog.image} alt="Blog" />
      )}
      <p className="text-lg text-justify whitespace-pre-line px-4">{blog.content}</p>
      <div className="flex space-x-2 pt-20">
        <View />
        <span>{blog.views || 0}</span>
        <button onClick={handleEdit}>
          <Pencil />
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
