const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique:true},
    phone: {type:String, required: true},
    role: {type:String, required: true, enum: ["student", "teacher", "institute"]},
    password: {type:String, required: true},
    isOnline: {type: Boolean, default: false}
})


usersSchema.pre('save', async (next) => {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = new mongoose.model('Users', usersSchema)