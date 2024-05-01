import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import HomePage from './Pages/Home/HomePage';
import CreateListing from './Pages/Home/CreateListing';
import ListingDetails from './Pages/Home/ListingDetails';
import TripList from './Pages/Home/TripList';
import WhishList from './Pages/Home/WhishList';
import PropertyList from './Pages/Home/PropertyList';
import ReservationList from './Pages/Home/ReservationList';
import Footer from './Components/Footer';
import CategoryPage from './Pages/Home/CategoryPage';
import SearchingPage from './Pages/Home/SearchingPage';

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
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchingPage />} />
          <Route path='/:userId/trips' element={<TripList />} />
          <Route path='/:userId/wishList' element={<WhishList />} />
          <Route path='/:userId/properties' element={<PropertyList />} />
          <Route path='/:userId/reservations' element={<ReservationList />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
