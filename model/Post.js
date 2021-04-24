const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  image: String,

});

module.exports = mongoose.model("Post",PostSchema)