const Post = require('../model/Post')
const cloudinary = require('../middleware/cloudinary')
const Q = require("q");
const { reject } = require('q');

const getPost = async(req,res,next) => {
    const posts = await Post.find()
    return res.status(200).json({success: true,posts:posts})
}

const createPost = async(req,res,next) => {
    const newPost = new Post 
}

module.exports = {
    getPost
}