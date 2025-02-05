import React, { useEffect } from 'react';
import Header from './Header';
import Title from './Title';

const FirstPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        return () => {
            document.body.style.overflow = 'auto'; // Reset when component unmounts
        };
    }, []);

    return (
        <div className="h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: `url('/Blogging-in-Digital-Marketing.jpg')` }}>
            <Title />
            <Header />
            <div className='flex flex-col items-center justify-center h-fullp-8'>
                <p className='italic font-medium text-2xl pt-4 text-center'>
                    Create and publish your blogs with ease
                </p>
            </div>
        </div>
    );
};

export default FirstPage;
