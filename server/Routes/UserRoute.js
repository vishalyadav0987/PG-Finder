const express = require('express');
const router = express.Router();
const { getAllTrips,
    addToWhisList,
    getAllPropety,
    getAllReservation,
} = require('../Controllers/UserController')


router.get('/:userId/trips', getAllTrips);
router.patch('/:userId/:listingId', addToWhisList);
router.get("/:userId/properties",getAllPropety);
router.get("/:userId/reservations",getAllReservation );



module.exports = router;