const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  image: Object,
  rating: [{ type : Schema.Types.ObjectId, ref: "Review"}]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post
