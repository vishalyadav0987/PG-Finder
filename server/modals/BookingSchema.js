const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId, // jo user book kar raha hai
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId, // jisne listing banai hai
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId, // product id
      ref: "Listing",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Booking", BookingSchema)