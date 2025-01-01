//fetchMessages
const Conversation = require('../model/conversation');
const Messages = require('../model/message');
const Users = require('../model/users')
async function fetchMessages(user) {
    try {
        const conversations = await Conversation.find({ users: user })
        if (!conversations) return { status: 400, errMsg: "no conversation" }
        else {
            const chats = []
            for (let conversation of conversations) {
                const data = {};
                data.party = conversation.users.filter(e => e !== user)[0]
                data.messages = await Messages.find({ _id: { $in: conversation.message } }, { _id: 0, __v: 0, timeStamp: 0, createdAt: 0 }).lean()
                chats.push(data);
            }
            return chats
        }
    } catch (err) {
        console.error("error occured while fetchMessages", err)
    }
}

async function checkOnline(userEmail) {
    const conversations = await Conversation.find({ users: userEmail }, { _id: 0, message: 0, _users: 0, timeStamp: 0, __v: 0 }).lean()
    let activeUsers = conversations.map(e => {
        return e.users.filter(e => e !== userEmail)[0]
    })

    activeUsers = await Users.find({ $and: [{ email: { $in: activeUsers } }, { isOnline: true }] }).select('email').lean()
    activeUsers = activeUsers.map(e => e.email)

    return { conversations, activeUsers }
}

module.exports = { fetchMessages, checkOnline }