const wss = require("../index")
const Conversation = require('../model/conversation');
const { initiateMessage } = require('./chatHandler')
const { fetchMessages } = require("./fetchMessages")

const userConnections = new Map();

wss.on("connection", (ws) => {
    // ws.send(JSON.stringify(fetchMessages()))

    ws.on("message", async (message) => {
        const data = JSON.parse(message)

        if (data.event) {
            const userEmail = data.payload.email

            userConnections.set(userEmail, ws);
            const retrieveMessages = JSON.stringify(await fetchMessages(userEmail))
            ws.send(retrieveMessages)
        }
        else {
            const chats = await initiateMessage(data)
            ws.send(JSON.stringify(chats))

            const receipentWs = userConnections.get(data.receiver)
            if(receipentWs && (receipentWs.readyState === WebSocket.OPEN)){
                receipentWs.send(JSON.stringify(await fetchMessages(data.receiver)))
            }
        }
    })

    ws.on("close", () => {
        console.log("connection close")
    })
})

module.exports = wss