const express = require('express');
const server = require('http').Server()
const mongoose = require('mongoose');

// Use express FrameWork
const app = express()

//import config
const MongoURI = require('./config/key').MongoURI

//Connect database
mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=> console.log('connect to database'))
.catch((err) => console.log(err) )

const PORT = process.env.PORT || 3000
server.listen(process.env.PORT || 3000 , console.log(`server is running with http://localhost:${PORT}`))