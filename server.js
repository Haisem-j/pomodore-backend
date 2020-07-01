const express = require('express')
var cors = require('cors')
const app = express()

// Port
const port = 5000

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
