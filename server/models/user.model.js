
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    birthday: String,
    gender: String
    // conversation: [
    //     {
    //         recievier: String,

    //     }
    // ]
},
    {
        collection: 'Users'
    });

module.exports = mongoose.model('User', userSchema)