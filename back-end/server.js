// Import dotenv library
require('dotenv').config()  
// Import Express Library                                                                                       
const express = require('express')                                                                                 
// create app function using express 
const app = express()                                                                                              
// Create the path Function for Set the specified location
const path = require('path')                                                                                       
// Import logger forn logger.js
const { logger } = require('./middleware/logger')                                                                  
// Call errorHandler function from errorHander.js
const errorHandler = require('./middleware/errorHandler')                                                          
// Import the cookieParser Library
const cookieParser = require('cookie-parser')                                                                      
// Import the cors Library
const cors = require('cors')                                                                                       
// Call the corsOption function from corsOption.js
const corsOptions = require('./config/corsOptions')                                                                
// Import the data Base Module from the dbConn.js
const connectDB = require('./config/dbConn')                                                                       
// Import the Mongodb from the Library
const mongoose = require('mongoose')                                                                               
// Import the logEvents using the logger.js
const { logEvents } = require('./middleware/logger')                                                               
// Create the Port 
const PORT = process.env.PORT || 3500

// Create the .env file and import their data
console.log(process.env.NODE_ENV)                                                                                   

// Call the Connect Database Function
connectDB()                                                                                                        

// Apply the logger to the app
app.use(logger)                                                                                                    

// Apply the cors library and corsOptions Modules
app.use(cors(corsOptions))                                                                                         

// Apply the Express.json
app.use(express.json())                                                                                            

// Apply the cookieParser Library 
app.use(cookieParser())                                                                                            

// Get the CSS Location From Directory for the 404 page 
app.use('/', express.static(path.join(__dirname, '/public')))                                                      

// Get the html Location From Using this root.js
app.use('/', require('./routes/root')) 
app.use('/auth', require('./routes/authRoutes'))  
app.use('/users', require('./routes/userRoutes'))                                                                       
app.use('/notes', require('./routes/noteRoutes'))
app.use('/sign', require('./routes/signRoute'))

// Create the 404 Not Found Page
app.all('*', (req, res) => {                                                                                       
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')) {
        res.json({message: '404 Not Found'})
    }else {
        res.type('text').send('404 Not Found')
    }
})

// Apply the errorHandler Module using errorHandler.js
app.use(errorHandler)                                                                                               

// Crete the Connection For Mongo DB
mongoose.connection.once('open', () => {                                                                            
    console.log('Connected to MongoDB')
    // Signal from the Server from the connected with Port
    app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))                                           
    
})

// if Mongo Connection Error Write the mongoErrLog.log file Errors
mongoose.connection.on('error', err => {                                                                            
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})