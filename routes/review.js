const express = require('express');
const router = require('express-promise-router')()
const ReviewController = require('../controllers/review.controller')
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/verify-token')

router.route('/:postID')
    // .get(ReviewController.getReview)
    .post(verifyToken,upload.array('image',10), ReviewController.createReview)

module.exports = router;