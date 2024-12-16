//index
require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js'); // requiring the database
const router = require('./route/routes.js')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const http = require('node:http')


//defining port
const PORT = process.env.PORT || 5000

//connection to database
connectDB()

app.use(express.json())
app.use(cookieParser())

// app.use(cors())
// accepting cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-custom-user")
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // const setting = req.get("X-custom-user")

    // if (setting !== "taquila") {
    //     next()
    // }
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }



    // cors({
    //     origin: 'http://localhost:5173', // Your frontend URL
    //     credentials: true,              // Allow cookies and other credentials
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    //     allowedHeaders: ['Content-Type', 'Authorization', 'X-custom-user'], // Custom headers
    // })
    next()
})
// app.use(express.urlencoded({extended: true}))


// routers
app.use('/', router)


// setup for the listen
app.listen(PORT, () => console.log(`server has initiated at port ${PORT}`))