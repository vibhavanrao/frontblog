import { useState, useEffect } from "react";
import Header from "./Header";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { View, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

function MainPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Limit description length
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Handle blog click - Increase view count and navigate to details page
  const handleBlogClick = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`);
      await axios
        .put(`http://localhost:5000/api/blogs/${id}/views`)
        .then((response) => console.log("Views updated:", response.data))
        .catch((error) => console.error("Error updating views:", error));

      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle blog editing
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <Title />
      <Header />
      <div>
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs available currently.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex border-2 border-gray-200 p-4 cursor-pointer"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt="Blog"
                  className="h-40 w-50 object-cover"
                  onClick={() => handleBlogClick(blog.id)}
                />
              )}
              <div className="ml-4 w-2/3">
                <h2 className="text-xl italic font-bold">{blog.title}</h2>
                <p>{truncateText(blog.content, 600)}</p>
                <div className="flex">
                  <p className="flex ml-2 px-2 py-3">
                    <View /> {blog.views || 0}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEdit(blog.id)}
                      className="px-2 py-1 rounded mr-2"
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-2 py-1 rounded"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MainPage;
