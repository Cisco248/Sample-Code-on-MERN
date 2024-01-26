// Handle the error And It's writes on errLog.log

const { logEvents } = require('./logger') // Import 'logEvents' Function from logger.js

const errorHandler = (err, req, res, next) => { // Create the errorHandler Function
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log') // Error log Format and File Name
    console.log(err.stack) // Show the Identified Errors 

    const status = res.statusCode ? res.statusCode : 500 // server error

    res.status(status) // Response to the Status with Errors

    res.json({ message: err.message }) // Response the .json with Message: Error.Message
}

module.exports = errorHandler // Finallize the Module