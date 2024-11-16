require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js'); // requiring the database
const router = require('./route/routes.js')

//defining port
const PORT = process.env.PORT || 5000

//connection to database
connectDB()
// app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routers
app.use('/', router)


// setup for the listen
app.listen(PORT, () => console.log(`server has initiated at port ${PORT}`))