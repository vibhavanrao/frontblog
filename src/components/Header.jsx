import React from 'react'
import { Search } from 'lucide-react';
const Header = () => {
  return (
    <div>
      <div className='flex border w-full h-20 justify-between'>
        <div>
          <img className='h-18 px-2' src="public\OIP.jpg" alt="Image"></img>
        </div>
        <div>
          <div className='flex space-x-3 p-4 w-2xl justify-center items-center'>
            <input type='text' className='rounded-full border' placeholder='Search your blog'></input>
            <Search />
          </div>
        </div>
        <div >
          <ul className='flex p-4 space-x-4 mr-8'>
            <li className='border rounded-2xl px-2'><a href="\"><b>   Home   </b></a></li>
            <li className='border rounded-2xl px-2'><a href='\blogs'><b>   Latest Blogs   </b></a></li>
            <li className='border rounded-2xl px-2'><a href="\AddBlog"><b>   Add Blog   </b></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
