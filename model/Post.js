const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: String,
  title: String,
  body: String,
  image: Object,
  rating: [{ type : Schema.Types.ObjectId, ref: "Review"}],
  location: String,
  timeOpen: String,
  timeClose: String,
  price: String,
  linkYoutube: [Object],
  linkLocation: [Object]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post
