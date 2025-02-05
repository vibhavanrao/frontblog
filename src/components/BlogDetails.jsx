import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = blogs.find((b) => b.id === parseInt(id));
    setBlog(foundBlog);
  }, [id]);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">Views: {blog.views || 0}</p>
      <img src={blog.image} alt="Blog" className="w-full h-80 object-cover my-4" />
      <p className="text-lg">{blog.content}</p>
    </div>
  );
}

export default BlogDetails;