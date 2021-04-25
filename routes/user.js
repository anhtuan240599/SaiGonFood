const express = require('express');
const router = require('express-promise-router')()
const UserController = require('../controllers/User.controller')
const upload = require('../middleware/upload')

router.route('/')
    .get(UserController.getUser)
    .User(upload.array('image',10), UserController.createUser)

module.exports = router;