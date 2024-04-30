const BookingSchema = require('../modals/BookingSchema');


const CreateBooking = async (req, res) => {
    try {
        const {
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
        } = req.body;
        const newBooking = new BookingSchema({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
        });
        await newBooking.save();
        res.status(201).json({ success: true, newBooking });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: error.message, msg: "Failed to create new booking" });
    }
}

module.exports={
    CreateBooking,
}