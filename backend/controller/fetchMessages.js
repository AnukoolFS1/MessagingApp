const Conversation = require('../model/conversation');
const Messages = require('../model/message');

async function fetchMessages(user) {
    try {
        const conversations = await Conversation.find({ users: user })

        const chats = []
        for (let conversation of conversations) {
            const data = {};

            data.party = conversation.users.filter(e => e !== user)[0]
            data.messages = await Messages.find({ _id: { $in: conversation.message } }, { _id: 0, __v: 0, timeStamp: 0, createdAt: 0 }).lean()

            chats.push(data);

            return chats
        }
    }catch (err) {
        console.error("error occured while fetchMessages", err)
    }
}

module.exports = { fetchMessages }