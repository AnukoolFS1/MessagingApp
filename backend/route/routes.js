const express = require('express')
const router = express.Router()
const multer = require('multer')
const { registerUser, loginUser } = require('../controller/userHandler')

const uploads = multer({dest:"uploads/"})

//
router.get('/chatapp', (req, res) => {
    console.log(req.cookies)
    res.end("data")
})
// users handlings
router.post('/register', uploads.single("file") ,registerUser)
router.post('/login', loginUser)



module.exports = router