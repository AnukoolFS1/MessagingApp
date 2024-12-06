// chatHandler.js
const Conversation = require('../model/conversation')
const Messages = require('../model/message')

const jwt = require('jsonwebtoken');

const sKey = process.env.JWT_SKey

const initiateUser = (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        const user = jwt.verify(token, sKey)
        res.status(200).json(user)
    } else {
        res.status(403).json({ msg: "auth failed" })
    }
}

const initiateMessage = async (req, res) => {
    const { reciever, sender, message, conversation } = req.body;

    if (!conversation) {
        const conversation = Conversation.findOne({userOne: sender, userTwo: reciever})
    }
}

module.exports = { initiateUser }