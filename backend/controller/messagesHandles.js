const Messages = require('../model/message')
const Conversation = require('../model/conversation')


const getMessages = async (req, res) => {
    const user = req.params.user
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        let Interval = setInterval(async () => {
            try{
                const conversations = await Conversation.find({ users: user })
                
                const chats = []
                for (let conversation of conversations) {
                    const data = {};
                    
                    data.party = conversation.users.filter(e => e !== user)
                    data.messages = await Messages.find({ _id: { $in: conversation.message } }, { _id: 0, __v: 0, timeStamp: 0, createdAt: 0 }).lean()
                    
                    chats.push(data);
                }
                res.write(`data : ${JSON.stringify(chats)}\n\n`);
            }catch(err){
                console.error(err);
                res.write("error: error\ndata: Server encountered error\n\n")
            }
        }, 5000)

        req.on("close", () => {
            console.log('client disconnected');
            clearInterval(Interval);
            res.end()
        })
    }catch(err){
        console.err("error occurred",err);
        res.status(500).json({msg:"server failed to respond, an error occured"})
    }
}


module.exports = { getMessages }