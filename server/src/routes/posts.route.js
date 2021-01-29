const express = require('express');
const router = express.Router()

const postController = require('../controllers/posts.controller')

router.get('/', postController.getPost)
router.post('/', postController.createPost)
router.post('/:id', postController.updatePost)
router.put('/:id', postController.updateComment)



module.exports = router;