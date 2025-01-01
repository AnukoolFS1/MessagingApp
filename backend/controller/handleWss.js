const wss = require("../index")
const { initiateMessage } = require('./chatHandler')
const { fetchMessages, checkOnline } = require("./fetchMessages")
const {statusOff, statusOn} = require("./userHandler")

// save user logins
const userConnections = new Map();

wss.on("connection", (ws) => {

    ws.on("message", async (message) => {
        const data = JSON.parse(message)

        if (data.event) {
            const userEmail = data.payload.email
            await statusOn(userEmail)
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

    ws.on("close", async () => {
        for(let [user,connection] of userConnections){
            if(connection === ws) {
                statusOff(user); console.log(user);
                userConnections.delete(user)

                const {activeUsers} = await checkOnline(user)
                for(let users of activeUsers){
                    const receipentWs = userConnections.get(users);
                    if(receipentWs && (receipentWs.readyState === WebSocket.OPEN)){
                        receipentWs.send(JSON.stringify({status: 0, user}))
                    }
                }
                break;
            }
        }
        console.log("connection close")
    })
})

module.exports = wss