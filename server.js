const express = require('express');
const server = require('http').Server()
const mongoose = require('mongoose');

// Use express FrameWork
const app = express()

//import config
const MongoURI = require('./config/key').MongoURI

//import routes
const postRoute = require('./routes/post')

// Routes
app.use('/posts',postRoute)

//Connect database
mongoose.connect(MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=> console.log('connect to database'))
.catch((err) => console.log(err) )

//Catch error
app.use((req,res,next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})


//Error function
app.use((err,req,res,next) =>  {
  const error = app.get('env') === 'development' ? err : {} ;
  const status = err.status || 500

  //response to client 
  return res.status(status).json({
      error: {
          message : error.message
      }
  })
})


const PORT = process.env.PORT || 3000
server.listen(process.env.PORT || 3000 , console.log(`server is running with http://localhost:${PORT}`))