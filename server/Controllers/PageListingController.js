const PageListingSchema = require("../modals/PageListingSchema");

const createListing = async (req, res) => {
    try {
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body;


        const listingPhotos = req.files;
        if (!listingPhotos) {
            return res.status(400).json({ success: false, msg: "No file Uploaded" });
        }

        // put all photos in db array
        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = new PageListingSchema({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });
        await newListing.save();
        res.status(201).json({ success: true, msg: "Listing successfully created", newListing })
    } catch (error) {
        res.status(409).json({ success: false, msg: "Listing not created!:", error: error.message })
    }
}

// Get getAllListingProperty;
const getAllListingProperty = async (req, res) => {
    const { category } = req.query;
    try {
        let listings
        if (category) {
            listings = await PageListingSchema.find({ category }).populate("creator"); // it indicate user make the listing
        }
        else {
            listings = await PageListingSchema.find().populate("creator");;
        }
        res.status(200).json({ suceess: true, listings });
    } catch (error) {
        res.status(500).json({ suceess: false, msg: "error to fetching the data:", error });
    }

}
module.exports = {
    createListing,
    getAllListingProperty,
}