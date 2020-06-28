const mongoose = require('mongoose');

const DB_CONNECTION = "mongodb+srv://jhaisem:adamnadia@pomodore.y08ae.mongodb.net/pomodore?retryWrites=true&w=majority";
const connection = mongoose.createConnection(
    DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MainDB");
    }
)

// Export connection
module.exports = { connection };