const BookingSchema = require('../modals/BookingSchema');
const UserSchema = require('../modals/UserSchema');
const PageListingSchema = require('../modals/PageListingSchema');

/*** GET ALL TRIPS LIST ***/
const getAllTrips = async (req, res) => {
    try {
        const { userId } = req.params; // ye customer ki booking ko find karega
        const trips = await BookingSchema.find(
            {
                customerId: userId
            }
        ).populate("customerId hostId listingId");
        res.status(200).json({ success: true, trips });
    } catch (error) {
        res.status(404).json({ success: false, msg: "Unable to fetch trips", error: error.message });
    }
}

/*** ADD ITEM IN WHISLIST ***/
const addToWhisList = async (req, res) => {
    try {
        const { userId, listingId } = req.params;
        const user = await UserSchema.findById(userId);
        const listing = await PageListingSchema.findById(listingId).populate("creator");

        // iska mtlb hai ki userId wala user ke whitlist me woh item present hai ya nh hai it means jo userSchema me whistlist me
        const favoriteListing = user.whishList.find((property) => property._id.toString() === listingId
        );
        if (favoriteListing) {
            user.whishList = user.whishList.filter((property) => property._id.toString() !== listingId
            );
            await user.save();
            res.status(200).json({ sucess: true, msg: 'Listing is removed to whislist', whishList: user.whishList })
        }
        else {
            user.whishList.push(listing);
            await user.save();
            res.status(200).json({ sucess: true, msg: 'Listing is added to whislist', whishList: user.whishList })
        }
    } catch (error) {
        res.status(404).json({ sucess: false, error: error.message });
    }
}


/* GET PROPERTY LIST */
const getAllPropety = async (req, res) => {
    try {
        const { userId } = req.params
        const properties = await PageListingSchema.find({ creator: userId }).populate("creator")
        res.status(202).json(properties);

    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "Can not find properties!", error: err.message })
    }
}

/* GET RESERVATION LIST */
const getAllReservation = async (req, res) => {
    try {
        const { userId } = req.params
        const reservations = await BookingSchema.find({ hostId: userId }).populate("customerId hostId listingId")
        res.status(202).json(reservations)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "Can not find reservations!", error: err.message })
    }
}



module.exports = {
    getAllTrips,
    addToWhisList,
    getAllPropety,
    getAllReservation
}