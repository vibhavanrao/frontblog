import { useState } from 'react'
import AddBlog from './components/AddBlog'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from './components/MainPage'
import BlogDetails from './components/BlogDetails'
import EditBlog from './components/EditBlog';
import FirstPage from './components/FirstPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/blogs" element={<MainPage />} />
        <Route path="/AddBlog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </>
  )
}

export default App
