require('dotenv').config()
const express = require("express");
const cors = require('cors')
const app = express(cors());
const server = require("http").Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// Use express FrameWork
app.use(bodyParser.json());
app.use(cors())

//import config
const MongoURI = require("./config/key").MongoURI;

//import routes
const postRoute = require("./routes/post");
const userRoute = require('./routes/user')

// Routes
app.use("/posts", postRoute);
app.use('/users',userRoute)
app.get('/', (req, res) => {
  res.send('Hello World');
});


//Connect database
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

//Catch error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  //response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
server.listen(
  process.env.PORT || 3000,
  console.log(`server is running with http://localhost:${PORT}`)
);
