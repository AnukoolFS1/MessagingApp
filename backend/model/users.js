const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique:true},
    phone: {type:String, required: true},
    role: {type:String, required: true, enum: ["Student", "Teacher", "Institute"]},
    password: {type:String, required: true},
    isOnline: {type: Boolean, default: false}
})

module.exports = new mongoose.model('Users', usersSchema)