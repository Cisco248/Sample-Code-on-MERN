// Login Information And writes It's Information on reqLog.log

const{ format } = require('date-fns') // import the format function from 'date-fns'
const { v4: uuid} = require('uuid') // import the uuid v4 function from 'uuid'
const fs = require('fs') // import the fs function from 'fs'
const fsPromises = require('fs').promises 
const path = require('path') // import the path function for the set source path


const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}` // Date and Time format variable
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` // write the imformation about date, id, message format

    console.log(logItem); // Display on the console about all the log item information

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) { // if 'fs' can't sync identifying the error
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) // Make the new directory any it's specified location
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem) // write the error information list by list
    } catch (err) { // catch the error 
        console.log(err) // show the catches error on terminal
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log') // Error information format and File name 
    console.log(`${req.method} ${req.path}`) // Show the error Method and Path
    next() // Next Function
}

module.exports = { logEvents, logger }; // Finallize the Module