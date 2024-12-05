const express = require('express')
const router = express.Router()
const multer = require('multer')
const { registerUser, loginUser } = require('../controller/userHandler')
const { initiateUser } = require('../controller/chatHandler')

const uploads = multer({dest:"uploads/"})

//
router.get('/chatapp', initiateUser)

// users handlings
router.post('/register', uploads.single("file") ,registerUser)
router.post('/login', loginUser)




module.exports = router