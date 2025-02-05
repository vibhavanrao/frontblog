import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { View, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = blogs.find((b) => b.id === parseInt(id));
    setBlog(foundBlog);
  }, [id]);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="min-h-screen w-full p-4 bg-gray-200">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p>-by {blog.author}</p>
      <img className='justify-items-center w-150 mx-auto' src={blog.image} alt="Blog" />
      <p className="text-lg text-justify whitespace-pre-line px-4">{blog.content}</p>
      <div className='flex'>
        <div className='flex space-x-2 pt-20'>
          <View />
          <span>{blog.views || 0}</span>
          <button
            onClick={() => handleEdit(blog.id)}
          >
            <Pencil />
          </button>
        </div>

      </div>
    </div>
  );
}

export default BlogDetails;