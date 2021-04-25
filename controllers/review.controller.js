const Review = require("../model/Review");
const Post = require("../model/Post");
const User = require("../model/User");
const cloudinary = require("../middleware/cloudinary");

const createReview = async (req, res, next) => {
  const review = req.body;
  const foundUser = await User.findById(req.decoded._id);
  const foundPost = await Post.findById(req.params.postID);
  const newReview = new Review(review);
  if (req.files) {
    const urls = [];
    const ids = [];
    for (const File of req.files) {
      const { path } = File;
      const result = await cloudinary.uploader.upload(path);
      urls.push(result.secure_url);
      ids.push(result.public_id);
    }
    newReview.image = urls;
  }
  await newReview.save();
  await foundUser.reviews.push(newReview._id);
  await foundPost.rating.push(newReview._id);
  return res.status(200).json({ success: true, review: newReview });
};

module.exports = {
  createReview,
};
