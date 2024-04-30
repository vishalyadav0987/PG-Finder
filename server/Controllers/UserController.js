const BookingSchema = require('../modals/BookingSchema');

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

module.exports={
    getAllTrips,
}