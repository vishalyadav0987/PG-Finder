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

const login = async (req, res) => {
    try {
        /* Take the infomation from the form */
        const { email, password } = req.body

        /* Check if user exists */
        console.log(email, password)
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.CONFLICT).json({ success: false, msg: "User doesn't exist!" });
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false,msg: "Invalid Credentials!" })
        }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECERET)
        delete user.password // data decode karke password destructurre kar liya hai

        res.status(StatusCodes.OK).json({success: true, token, user })

    } catch (err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}

module.exports = {
    register, login
}