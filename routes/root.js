const express = require('express')                                                                 // Import the Express from the Library
const router = express.Router()                                                                    // Import Router Function 
const path = require('path')                                                                       // Create Path Function For the Set Specified Location 

router.get('^/$|/index(.html)?', (req, res) => {                                                   // Get the html from the Directory Location
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router                                                                            // Finallize the Module