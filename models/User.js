const mongoose = require('mongoose');
const { connection } = require('../database')

const userSchema = new mongoose.Schema({

})





module.exports = connection.model("User", userSchema);
