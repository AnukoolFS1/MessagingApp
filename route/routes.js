const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controller/userHandler')

// users handlings
router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router