require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");


const { DBURL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//routing
//const getMessages = require('./routes/getMessages');
const postMessage = require('./routes/postMessage')
//app.use('/', getMessages);
app.use('/message', postMessage)



app.listen(9003)