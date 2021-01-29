const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    author: String,
    content: String,
    reaction: {
        like: Number,
        dislike: Number,
        smile: Number,
        heart: Number
    },
    comments: Array
},
    {
        collection: 'Posts'
    });

module.exports = mongoose.model('Post', postSchema)