import React from "react";
import "../../Styles/TripList.scss";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import ListingCard from "../../Components/ListingCard";
// import Footer from "../components/Footer"

const WhishList = () => {
  const WhishList = useSelector((state) => state.user.WhishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {WhishList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default WhishList;