const epxress = require('express');
const router = epxress.Router();
const { CreateBooking } = require('../Controllers/BookingController')

router.post('/create', CreateBooking);

module.exports = router