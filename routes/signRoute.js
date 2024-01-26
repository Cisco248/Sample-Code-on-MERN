const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Assume the User model is defined in a separate file (e.g., userModel.js)
const User = require('../models/User'); 

router.post('/signup', async (req, res) => {
    try {
        const { 
            username, 
            email, 
            mobile, 
            password 
        } = req.body;
        
        const newUser = new User({ 
            username, 
            email, 
            mobile, 
            password 
        });
        
        await newUser.save();
        res.json({ message: 'Signup successful' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
