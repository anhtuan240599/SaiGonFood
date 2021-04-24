const Post = require('../model/Post')
const cloudinary = require('../middleware/cloudinary')
const Q = require("q");
const { reject } = require('q');

const getPost = async(req,res,next) => {
    const posts = await Post.find()
    return res.status(200).json({success: true,posts:posts})
}

const createPost = async(req,res,next) => {
    const post = req.body
    const newPost = new Post(post)
    if (req.files) {
        const urls = []
        const ids = []
        for (const File of req.files) {
            const { path } = File
            const result = await cloudinary.uploader.upload(path);
            urls.push(result.secure_url)
            ids.push(result.public_id)

        }
        newPost.image = urls
    }
    await newPost.save()
    return res.status(201).json({success:true,post: newPost})
}

module.exports = {
    getPost,
    createPost
}