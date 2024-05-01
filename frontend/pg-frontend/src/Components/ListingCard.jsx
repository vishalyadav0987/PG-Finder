import React, { useState } from 'react'
import '../Styles/ListingCard.scss'
import { IoArrowBackCircle, IoArrowForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setwhishList } from '../redux/state';
import { MdFavorite } from "react-icons/md";

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
    startDate,
    endDate,
    totalPrice,
    booking
}) => {
    const navigate = useNavigate();
    /** Slider for image **/
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
    }
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % listingPhotoPaths.length);
    }

    /** Add to WhisList **/
    const user = useSelector((state) => state.user);
    const whishList = user?.whishList || [];

    const isLiked = whishList.find((property) => property?._id === listingId);

    const patchwhishList = async () => {
        if (user?._id !== creator._id) {
            const response = await fetch(
              `http://localhost:3000/api/v1/users/${user?._id}/${listingId}`,
              {
                method: "PATCH",
                header: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            dispatch(setwhishList(data.whishList));
          } else { return }

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
                {
                    !booking ? (
                        <>
                            <p>{type}</p>
                            <p>
                                <span>₹{price}</span> per month
                            </p>
                        </>
                    ) : (
                        <>
                            <p>{startDate} - {endDate}</p>
                            <p>
                                <span>₹{totalPrice}</span> total
                            </p>
                        </>
                    )
                }
                <button className="favorite" onClick={(e) => {
                    e.stopPropagation();
                    patchwhishList();
                }} 
                >
                    {isLiked ? (
                        <MdFavorite style={{ color: "red" }} />
                    ) : (
                        <MdFavorite style={{ color: "white" }} />

                    )}
                </button>
            </div>
        </>
    )
}

export default ListingCard
