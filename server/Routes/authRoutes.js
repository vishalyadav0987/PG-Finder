const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register } = require('../Controllers/AuthController');


/** Configuration Multur for File Uploade**/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/uploads'); // store upload file in uplods folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/** User Register **/
router.route('/register').post(upload.single('profileImage'), register);

module.exports = router;
