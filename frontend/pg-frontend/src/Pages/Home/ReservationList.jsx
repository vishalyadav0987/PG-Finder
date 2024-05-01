import React ,{ useEffect, useState } from "react";
import "../../Styles/TripList.scss";
import Loader from "../../Components/Loader";
import Navbar from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../../redux/state";
import ListingCard from "../../Components/ListingCard";
// import Footer from "../components/Footer"

const ReservationList = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const reservationList = useSelector((state) => state.user.reservationList);

    const dispatch = useDispatch();

    const getReservationList = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/users/${user._id}/reservations`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            dispatch(setReservationList(data));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Reservation List failed!", err.message);
        }
    };

    useEffect(() => {
        getReservationList();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Navbar />
            <h1 className="title-list">Your Reservation List</h1>
            <div className="list">
                {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
                    <ListingCard
                        listingId={listingId._id}
                        creator={hostId._id}
                        listingPhotoPaths={listingId.listingPhotoPaths}
                        city={listingId.city}
                        province={listingId.province}
                        country={listingId.country}
                        category={listingId.category}
                        startDate={startDate}
                        endDate={endDate}
                        totalPrice={totalPrice}
                        booking={booking}
                    />
                ))}
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default ReservationList;