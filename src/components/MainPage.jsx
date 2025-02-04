import { useState } from 'react'
import Header from './Header'
import Addsection from './Addsection'
import Title from './Title'

function MainPage() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  return (
    <>

      <Title />
      <Header />
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className='flex border-2 border-gray-200 p-4'>
            <img src={blog.image} alt="image" className='h-70 p-4 w-70'/>
            <div>
              <h2 className='text-xl italic font-bold'><b>{blog.title}</b></h2>
              <p>{blog.content}</p>
            </div>
          </div>
        ))}
      </div>
      <Addsection />
    </>
  )
}

export default MainPage
