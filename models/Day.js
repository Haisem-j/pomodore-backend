const mongoose = require('mongoose');
const { connection } = require('../database');

const daySchema = new mongoose.Schema({
    tomato: {
        type: Number,
        required: true
    },
    Day: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    }
})

module.exports = connection.model("Day", daySchema);