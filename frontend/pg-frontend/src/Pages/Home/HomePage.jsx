import React from 'react'
import Navbar from '../../Components/Navbar'
import Slider from '../../Components/Slider'
import Categories from "../../Components/Categories"
import Listing from '../../Components/Listing'


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Categories/>
      <Listing/>
    </>
  )
}

export default HomePage
