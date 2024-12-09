const express = require('express')
const router = express.Router()
const multer = require('multer')
const { registerUser, loginUser } = require('../controller/userHandler')
const { initiateUser, initiateMessage } = require('../controller/chatHandler')

const uploads = multer({dest:"uploads/"})

//chatapp
router.get('/chatapp', initiateUser);
router.post('/chatapp', initiateMessage);

router.get('/messages', )

// users handlings
router.post('/register', uploads.single("file") ,registerUser)
router.post('/login', loginUser)




module.exports = router