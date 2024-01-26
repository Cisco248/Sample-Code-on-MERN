const asyncHandler = require('express-async-handler')

// @desc Sign
// @route POST /auth
// @access Public
const Regform = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body

    if (!name) {
        return res.status(400).json({ message: 'Please Enter Name !' })
    }

    if (!email) {
        return res.status(400).json({ message: 'Please Enter Email !' })
    }

    if (!mobile) {
        return res.status(400).json({ message: 'Please Enter Mobile Number !' })
    }

    if (!password) {
        return res.status(400).json({ message: 'Create a Password !' })
    }

module.exports = Regform