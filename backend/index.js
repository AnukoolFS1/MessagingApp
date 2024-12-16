//index
require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js'); // requiring the database
const router = require('./route/routes.js')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const http = require('node:http')
const ws = require('ws')


//defining port
const PORT = process.env.PORT || 5000

//connection to database
connectDB()

app.use(express.json())
app.use(cookieParser())

// app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-custom-user")
    res.setHeader('Access-Control-Allow-Credentials', 'true')

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

// routers
app.use('/', router)
// setup for the listen
const server = http.createServer(app)

const wss = new ws.Server({server});

wss.on("connection", (ws) =>{
    ws.on("message", (message) =>{
        console.log(message)
    })

    ws.on("close", () => {
        console.log("connection close")
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Websocket server is running on ws://localhost:${PORT}`)
})
