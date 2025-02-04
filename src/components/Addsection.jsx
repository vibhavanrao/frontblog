import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddSection = () => {
  const navigate = useNavigate()
  return (
    <div className='justify-center text-center w-full p-2'>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>navigate("/AddBlog")}>
        Add New Blog
      </button>
    </div>
  );
};

export default AddSection;

