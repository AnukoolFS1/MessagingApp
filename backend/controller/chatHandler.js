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

        const conversation = await Conversation.find({users: user.email})

        res.status(200).json({user, conversation})
    } else {
        res.status(403).json({ msg: "auth failed" })
    }
}

const initiateMessage = async (req, res) => {
    try{const { receiver, sender, message, conversation } = req.body;

    const receiversExistence = Users.exist({email: receiver})

    if(!receiversExistence) res.status(400).json({errMsg: "receiver not found"})

    if (!conversation) {
        const conversation = new Conversation({
            message: [message],
            users: [sender, receiver],
            _users: [sender, receiver],
        })

        await conversation.save()
    }else{
    }
    
    const newMessage = new Messages({
        message, sender, receiver, conversationId: conversation
    })
    await newMessage.save();
    console.log(newMessage._id)
    // conversation.findByIdAndUpdate({_id:conversation}, {$set:{message:{$push: newMessage._id}}})

    res.status(201).json({msg:message})}
    catch(err){
        console.log(err);
        res.status(500).json({errorMsg: "server is unable to send the message, Please try again later!"})
    }
}

module.exports = { initiateUser, initiateMessage }