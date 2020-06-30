const express = require('express')
const app = express()

// Port
const port = 3000

// import routes
const authRoute = require('./routes/auth');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Middleware
app.use('/api/user', authRoute);




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
