// chatHandler.js
const Conversation = require('../model/conversation');
const Messages = require('../model/message');
const Users = require('../model/users');


const jwt = require('jsonwebtoken');
const { fetchMessages } = require('./fetchMessages');

const sKey = process.env.JWT_SKey

const initiateUser = async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        const user = jwt.verify(token, sKey)

        const conversations = await Conversation.find({ users: user.email }, {_id: 0, message:0, _users:0,timeStamp:0, __v: 0}).lean()
        let activeUsers = conversations.map(e => {
            return e.users.filter(e => e!==user.email)[0]
        })

        activeUsers = await Users.find({$and:[{email:{$in: activeUsers}}, {isOnline: true}] }).select('email').lean()
        activeUsers = activeUsers.map(e => e.email)

        res.status(200).json({ user, conversations, activeUsers })
    } else {
        res.status(403).json({ msg: "auth failed" })
    }
}

const initiateMessage = async (chat) => {
    const { receiver, sender, message } = chat
    if (!receiver || !sender || !message){ 
        return { errMsg: "some fields are empty" }
    }
    try {
        const senderId = await Users.findOne({ email: sender }).select("_id")
        const receiversExistence = await Users.findOne({ email: receiver }).select("_id")
        if (!receiversExistence) return{ errMsg: "receiver not found" }
        const conversation = await Conversation.find({ users: { $all: [sender, receiver] } })
        let newConversation
        if (conversation.length === 0) {
            newConversation = new Conversation({
                users: [sender, receiver],
                _users: [sender, receiver],
            })
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
        const chat = await fetchMessages(sender)
        return chat
    }
    catch (err) {
        console.log(err);
        return { errMsg: "server is unable to send the message, Please try again later!" }
    }
}

module.exports = { initiateUser, initiateMessage }