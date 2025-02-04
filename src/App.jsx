import { useState } from 'react'
import AddBlog from './components/AddBlog'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from './components/MainPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AddBlog" element={<AddBlog />} />
      </Routes>
    </>
  )
}

export default App
