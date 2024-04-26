const { StatusCodes } = require('http-status-codes');
const UserSchema = require('../modals/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;
        if (!profileImage) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "No file Upload" });
        }
        const profileImagePath = profileImage.path;
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User Already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new UserSchema({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profileImagePath,
        });
        await newUser.save();
        res.status(StatusCodes.CREATED).json({
            success: true,
            msg: "User Register Succesfully!",
            user: newUser
        });
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    register
}