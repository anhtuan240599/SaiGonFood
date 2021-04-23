const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {type : Schema.Types.ObjectId, ref :"User"},
  title: String,
  body: String,
  date: Date
});

module.exports = mongoose.model("Post",PostSchema)