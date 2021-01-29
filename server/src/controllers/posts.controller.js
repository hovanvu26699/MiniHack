// const { posts } = require('../data/post.data');
// const { v4: uuidv4 } = require('uuid');
const Post = require('../../models/post.model')



module.exports.getPost = async (req, res) => {
    const posts = await Post.find()
    res.json({ isSuccess: true, data: posts })
}

module.exports.createPost = async (req, res) => {
    // const newPost = { id: uuidv4(), ...req.body }
    // posts.push(newPost)
    // res.json({ status: 'success', newPost })

    const { author, content } = req.body;

    if (!author || !content) {
        return res.json({
            isSuccess: false,
            message: 'Missing required fields',
        })
    }

    const newPost = new Post({
        ...req.body, reaction: {
            like: 0,
            dislike: 0,
            smile: 0,
            heart: 0
        }
    })

    newPost.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Database error',
            })
        } else {
            return res.json({
                isSuccess: true,
                message: 'Post is created',
                data: doc,
            })
        }
    });
}

module.exports.updatePost = async (req, res) => {
    const { postID, postUpdate } = req.body;
    const q = Post.where({ _id: postID });
    q.update({ $set: { reaction: postUpdate.reaction } }).exec();
    return res.json({
        isSuccess: true,
        message: 'Reaction is updated',
        data: postUpdate.reaction
    })
}

module.exports.updateComment = async (req, res) => {
    const { postID, COMMENT } = req.body;
    const post = Post.where({ _id: postID });
    post.update({ $set: { 'comments': COMMENT } }).exec();
    return res.json({
        isSuccess: true,
        message: 'Comments is updated',
        data: COMMENT
    })
}