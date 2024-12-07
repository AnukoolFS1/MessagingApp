// chatHandler.js
const Conversation = require('../model/conversation');
const Messages = require('../model/message');
const Users = require('../model/users');


const jwt = require('jsonwebtoken');

const sKey = process.env.JWT_SKey

const initiateUser = async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        const user = jwt.verify(token, sKey)

        const conversation = await Conversation.find({ users: user.email }, {_id: 0, message:0, _users:0,timeStamp:0, __v: 0})

        res.status(200).json({ user, conversation })
    } else {
        res.status(403).json({ msg: "auth failed" })
    }
}

const initiateMessage = async (req, res) => {
    const { receiver, sender, message } = req.body;

    if (!receiver || !sender || !message) res.status(400).json({ msg: "some fields are empty" })
    try {

        const senderId = await Users.findOne({ email: sender }).select("_id")

        const receiversExistence = await Users.findOne({ email: receiver }).select("_id")

        if (!receiversExistence) res.status(400).json({ errMsg: "receiver not found" });

        const conversation = await Conversation.find({ users: { $all: [sender, receiver] } })

        let newConversation
        if (conversation.length === 0) {
            newConversation = new Conversation({
                users: [sender, receiver],
                _users: [sender, receiver],
            })

        } else {
        }

        const newMessage = new Messages({
            message, sender: senderId, receiver: receiversExistence._id, conversationId: !conversation ? newConversation._id : conversation._id
        })

        await newMessage.save();

        if (conversation.length === 0) {
            newConversation.message.push(newMessage._id)
            await newConversation.save()
        } else {
            await Conversation.findByIdAndUpdate({ _id: conversation[0]._id }, { $push: { message: newMessage._id } })
        }

        res.status(201).json({ msg: message })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "server is unable to send the message, Please try again later!" })
    }
}

module.exports = { initiateUser, initiateMessage }