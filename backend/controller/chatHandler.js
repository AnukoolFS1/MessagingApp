// chatHandler.js
const Conversation = require('../model/conversation')
const Messages = require('../model/message');
const Users = require('../model/users')


const jwt = require('jsonwebtoken');

const sKey = process.env.JWT_SKey

const initiateUser = async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        const user = jwt.verify(token, sKey)

        const conversation = await Conversation.find({ users: user.email })

        res.status(200).json({ user, conversation })
    } else {
        res.status(403).json({ msg: "auth failed" })
    }
}

const initiateMessage = async (req, res) => {
    try {
        const { receiver, sender, message } = req.body;

        console.log(sender)
        const senderId = await Users.findOne({email: sender}).select("_id")

        console.log(senderId, "hjghjt")

        const receiversExistence = await Users.findOne({ email: receiver }).select("_id")

        if (!receiversExistence) res.status(400).json({ errMsg: "receiver not found" });

        const conversation = await Conversation.find({ users: [sender, receiver] })

        let newConversation 
        if (conversation === 0) {
            newConversation = new Conversation({
                users: [sender, receiver],
                _users: [sender, receiver],
            })

        } else {
        }

        console.log(newConversation)
        const newMessage = new Messages({
            message, sender: senderId, receiver: receiversExistence._id, conversationId: !conversation ? newConversation._id : conversation._id
        })

        // await newMessage.save();

        if (conversation === 0) {
            newConversation.message.push(newMessage._id)
            await newConversation.save()
        }
        // conversation.findByIdAndUpdate({_id:conversation}, {$set:{message:{$push: newMessage._id}}})

        res.status(201).json({ msg: message })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "server is unable to send the message, Please try again later!" })
    }
}

module.exports = { initiateUser, initiateMessage }