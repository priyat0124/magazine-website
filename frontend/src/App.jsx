import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import UploadMagazine from './components/UploadMagazine'
import ViewMagazines from './components/ViewMagazines'
import CategoryPage from './components/CategoryPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadMagazine />} />
      <Route path="/view" element={<ViewMagazines />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  )
}

export default App
