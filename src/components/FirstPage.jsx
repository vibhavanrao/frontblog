import React from 'react'
import Header from './Header'
import Title from './Title'

const FirstPage = () => {
    return (
        <div>
            <Title />
            <Header />
            <div className='flex items-center'>
                <img className='p-8 h-125' src="https://th.bing.com/th/id/OIP.4BvJYVr9W9ewKRV3HlF5PQHaEK?w=300&h=180&c=7&r=0&o=5&pid=1.7" />
                <div className='pl-10'>
                    <h1 className='italic font-extrabold text-4xl text-center'><u>Bloggerss-spot</u></h1>
                    <p className='italic font-medium text-4xl pt-4'>Create and publish your blogs with ease</p>
                </div>
            </div>
        </div>
    )
}

export default FirstPage
