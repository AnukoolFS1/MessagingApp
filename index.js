require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js')

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => console.log(`server has initiated at port ${PORT}`))