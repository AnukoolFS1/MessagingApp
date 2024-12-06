const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessagesSchema = new Schema({
    message: {type: String, required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref:"Users"},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref:"Users"},
    timeStamp: {type:Date, default:Date.now},
    status: {type: String, enum : ["sent", "delivered", "read"], default: "sent"},
    conversationId : {type: mongoose.Schema.Types.ObjectId, ref: "conversation"}
}, {timestamps: true})

const Messages = new mongoose.model("messages", MessagesSchema);

module.exports = Messages