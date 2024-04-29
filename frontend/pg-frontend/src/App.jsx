import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import HomePage from './Pages/Home/HomePage';
import CreateListing from './Pages/Home/CreateListing';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-listing' element={<CreateListing/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
