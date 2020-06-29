const express = require('express')
const app = express()

// Port
const port = 3000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const authRoute = require('./routes/auth');

// Route Middleware
app.use('/api/user', authRoute);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
