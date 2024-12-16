// converstation
const { model, Schema } = require('mongoose');

const conversationSchema = new Schema({
    message: { type: [{ type: Schema.Types.ObjectId, required: true }] },
    users: {
        type: [{ type: String, required: true }],
        validate: {
            validator: function (value) {
                return value.length <= 2;
            },
            message: "Users for a conversation can't be more than 2"
        }
    },
    _users: { type: [{ type: String, required: true }] },
    timeStamp: { type: Date, default: Date.now },
}, { timeStamp: true })

const Conversation = new model("conversation", conversationSchema)

module.exports = Conversation;