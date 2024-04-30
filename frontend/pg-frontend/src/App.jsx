import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import HomePage from './Pages/Home/HomePage';
import CreateListing from './Pages/Home/CreateListing';
import ListingDetails from './Pages/Home/ListingDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/properties/:listingId' element={<ListingDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
