const express = require('express');
const router = express.Router();
const { getAllTrips } = require('../Controllers/UserController')


router.get('/:userId/trips', getAllTrips);


module.exports = router;