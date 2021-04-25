const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  comment: String,
  rating: Number,
  image: Object,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  postID: { type: Schema.Types.ObjectId, ref: "Post" },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
