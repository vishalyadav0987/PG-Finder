import React, { useState } from 'react'
import '../Styles/ListingCard.scss'
import { IoArrowBackCircle, IoArrowForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ListingCard = ({
    listingId,
    creator,
    listingPhotoPaths,
    city,
    province,
    country,
    category, 
    type,
    price,
}) => {
    const navigate = useNavigate();
    /** Slider for image **/
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
    }
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % listingPhotoPaths.length);
    }
    return (
        <>
            <div className="listing-card" onClick={() => {
                navigate(`/properties/${listingId}`);
            }}>
                <div className="slider-container">
                    <div className="slider"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {
                            listingPhotoPaths?.map((photo, index) => (
                                <div className="slide" key={index}>
                                    <img
                                        src={`http://localhost:3000/${photo?.replace("public", "")}`}
                                        alt={`photo ${index + 1}`}
                                    />
                                    <div
                                        className="prev-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToPrevSlide(e);
                                        }}
                                    >
                                        <IoArrowBackCircle
                                            style={{ fontSize: "15px" }}
                                        />
                                    </div>
                                    <div
                                        className="next-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToNextSlide(e);
                                        }}
                                    >
                                        <IoArrowForwardCircleSharp style={{ fontSize: "15px" }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <h3>
                    {city}, {province}, {country}
                </h3>
                <p>{category}</p>
                <p>{type}</p>
                <p>  <span>₹{price}</span> per Month</p>
            </div>
        </>
    )
}

export default ListingCard
