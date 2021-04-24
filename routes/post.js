const express = require('express');
const router = require('express-promise-router')()
const PostController = require('../controllers/post.controller')
const upload = require('../middleware/upload')

router.route('/')
    .get(PostController.getPost)
    .post(upload.array('image',10), PostController.createPost)

module.exports = router;