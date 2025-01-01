const wss = require("../index")
const { initiateMessage } = require('./chatHandler')
const { fetchMessages, checkOnline } = require("./fetchMessages")
const {statusOff, statusOn} = require("./userHandler")

// save user logins
const userConnections = new Map();

function sendToreceipents(receiver,data){
    if(typeof(data) === 'string'){
        const receipentWs = userConnections.get(receiver)
        if(receipentWs && (receipentWs.readyState === WebSocket.OPEN)){
            receipentWs.send(data)
        }
    }else{
        console.log("error occured at func sendToreceipents, arguements were expected to be string type")
    }
}

async function sendUserStat(user,status){
    const {activeUsers} = await checkOnline(user)
    const payload = JSON.stringify({status, user})
    for(let users of activeUsers){
        sendToreceipents(users, payload)
    }
}

wss.on("connection", (ws) => {

    ws.on("message", async (message) => {
        const data = JSON.parse(message)

        if (data.event) {
            const userEmail = data.payload.email
            await statusOn(userEmail)
            userConnections.set(userEmail, ws);
            const retrieveMessages = JSON.stringify(await fetchMessages(userEmail))
            await sendUserStat(userEmail, 1)
            ws.send(retrieveMessages)
        }
        else {
            const chats = await initiateMessage(data)
            ws.send(JSON.stringify(chats))
            const receiversChats = JSON.stringify(await fetchMessages(data.receiver))
            sendToreceipents(data.receiver, receiversChats)
        }
    })

    ws.on("close", async () => {
        for(let [user,connection] of userConnections){
            if(connection === ws) {
                await statusOff(user); console.log(user);
                userConnections.delete(user)
                await sendUserStat(user, 0)
                break;
            }
        }
        console.log("connection close")
    })
})

module.exports = wss