const Messages = require('../model/message')
const Conversation = require('../model/conversation')


const getMessages = async (req,res) => {
    const user = req.params.user

    console.log(user)
    const conversation = await Conversation.find({users: user})

    console.log(conversation)

    const message = await Messages.find({_id:{$in:conversation.message}}).lean()

    console.log(message)

    res.end()

}


module.exports = { getMessages }