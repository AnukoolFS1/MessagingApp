const { model, Schema } = require('mongoose');

const conversationSchema = new Schema({
    message: { type: [{ type: Schema.Types.ObjectId, required: true }] },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: "Users", required: true }],
        validate: {
            validator: function (value) {
                return value.length === 2;
            },
            message: "A conversation must have exactly two users"
        }
    },
    timeStamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
}, { timeStamp: true })

const Conversation = new model("conversation", conversationSchema)

module.exports = Conversation;