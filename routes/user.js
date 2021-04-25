const express = require('express');
const router = require('express-promise-router')()
const UserController = require('../controllers/user.controller')
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/verify-token')

router.route('/register')
    .post(UserController.register)

router.route('/')
    .get(verifyToken,UserController.foundUser)

module.exports = router;