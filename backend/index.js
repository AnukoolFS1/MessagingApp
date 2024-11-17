require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js'); // requiring the database
const router = require('./route/routes.js')
const cors = require('cors')

//defining port
const PORT = process.env.PORT || 5000

//connection to database
connectDB()

app.use(express.json())

// accepting cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-custom-user")

    const setting = req.get("X-custom-user")

    if (setting === "taquila") {
        cors()
    }

    next()
})

// app.use(express.urlencoded({extended: true}))

// routers
app.use('/', router)


// setup for the listen
app.listen(PORT, () => console.log(`server has initiated at port ${PORT}`))