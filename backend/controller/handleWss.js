const wss = require("../index")
const Conversation = require('../model/conversation');
const {initiateMessage }= require('./chatHandler')
const {fetchMessages} = require("./fetchMessages")

wss.on("connection", (ws) => {
    ws.send(JSON.stringify(fetchMessages()))
    
    ws.on("message", async (message) => {
        const chat = await initiateMessage(message)
        ws.send(JSON.stringify(chat))
    })

    ws.on("close", () => {
        console.log("connection close")
    })
})

module.exports = wss