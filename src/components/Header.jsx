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
      </div>
    </div>
  )
}

export default Header
