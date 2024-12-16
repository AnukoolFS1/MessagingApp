// db
const mongoose = require('mongoose');
const uri = process.env.DB_URI


async function connectDB() {
    try{
        await mongoose.connect(uri);
        console.log('Database has connected')
    }
    catch(err) {
        console.log('Some error occurred while connection with the Database.')
        console.log(err.message)
    }
}

module.exports = connectDB