import { useState } from 'react';
import Header from './Header';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('blogs')) || []);
  const navigate = useNavigate();

  // Limit description length
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Handle blog click - increase view count and navigate to details page
  const handleBlogClick = (id) => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === id ? { ...blog, views: (blog.views || 0) + 1 } : blog
    );

    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    navigate(`/blog/${id}`); // Redirect to blog details page
  };

  // Handle blog deletion
  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  // Handle blog editing
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Title />
      <Header />
      <div>
        {
        blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs available currently.</p>
        ) : blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex border-2 border-gray-200 p-4 cursor-pointer"
          >
            <img
              src={blog.image}
              alt="Blog"
              className="h-40 w-50 object-cover"
              onClick={() => handleBlogClick(blog.id)}
            />
            <div className="ml-4 w-2/3">
              <h2 className="text-xl italic font-bold">{blog.title}</h2>
              <p>{truncateText(blog.content, 100)}</p>
              <p className="text-sm text-gray-500">Views: {blog.views || 0}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MainPage;
