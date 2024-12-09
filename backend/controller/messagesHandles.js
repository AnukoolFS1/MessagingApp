const Messages = require('../model/message')
const Conversation = require('../model/conversation')


const getMessages = async (req,res) => {
    const user = req.params.user

    const converstation = await Conversation.find({users: user})

    console.log(converstation)

}


module.exports = { getMessages }