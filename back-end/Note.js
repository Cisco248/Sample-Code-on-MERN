const mongoose = require('mongoose')  // Import mongoose from the mongoose Library
const AutoIncrement = require('mongoose-sequence')(mongoose) // Create the auto increment ussing 'mongoose-sequence' Library

const noteSchema = new mongoose.Schema({ // Create  the New Schema and Their type, format
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User Id'
        },
        title: {
            type: String,
            required: true
        },
        text: [{
            type: String,
            required: true
        }],
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Alow to the Save the Data input time
    }
    )

noteSchema.plugin(AutoIncrement, { // Apply to the Auto increment For User Function
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema) // Finallize the Module