const mongoose = require('mongoose')
const { Schema } = mongoose;


const groupSchema = new Schema({
    name: String,
    description: String,
    post: Array
},
    {
        collection: 'Groups'
    });

module.exports = mongoose.model('Group', groupSchema)
