const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route Get /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No User Found' })
    }
    res.json(users)
})

// @desc Create New User
// @route post /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // Confirm Data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All Fields Are Required'})
    }

    // Check for Duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Username' })
    }

    // Hash Password
    const hashedpwd = await bcrypt.hash(password, 10) // password encrypt section (Hash)

    const userObject = { username, "password": hashedpwd, roles }

    // Create and Store New User
    const user = await User.create(userObject)

    if (user) { // Created
        res.status(201).json({ message: `New User ${username} Created` })
    } else {
        res.status(400).json({ message: 'Invalid User Data Received' })
    }

})

// @desc Update User
// @route Patch /users
// @access private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm Data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All Fields Are Required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User Not Found' })
    }

    // Check for Duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow Updae to the Original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash Password
        user.password = await bcrypt.hash(password, 10)
    }

    const updateUser = await user.save()

    res.json({ message: `${updateUser.username} Updated`})
})

// @desc Delete a User
// @route Delete /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User Id Required' })
    }

    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User Has Assigned Notes' })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User Not Found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} Deleted.`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}