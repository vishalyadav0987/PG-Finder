const PageListingSchema = require("../modals/PageListingSchema");
const UserSchema = require('../modals/UserSchema')


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
    const qCategory = req.query.category;
    try {
        let listings
        if (qCategory) {
            listings = await PageListingSchema.find({ category: qCategory }).populate("creator"); // it indicate user make the listing
        }
        else {
            listings = await PageListingSchema.find({}).populate("creator");;
        }
        res.status(200).json({ suceess: true, listings });
    } catch (error) {
        res.status(500).json({ suceess: false, msg: "error to fetching the data:", error: error.message });
    }

}

// Get single Feed 
const getSingleProperty = async (req, res) => {
    const { listingId } = req.params;
    try {
        const listingOK = await PageListingSchema.findById(listingId).populate("creator");
        res.status(200).json({ sucess: true, listingOK });
    } catch (error) {
        res.status(404).json({ sucess: false, msg: "Unable to ftech data:", error: error.message });
    }
}

/** SEARCHING **/

const searchProperty = async (req, res) => {
    const { search } = req.params;
    try {
        let listings = [];
        if (search === "all") {
            listings = await PageListingSchema.find().populate("creator");
        }
        else {
            listings = await PageListingSchema.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ]
            }).populate("creator")
        }
        res.status(200).json(listings);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
module.exports = {
    createListing,
    getAllListingProperty,
    getSingleProperty,
    searchProperty
}