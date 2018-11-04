require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const rateLimit = require("express-rate-limit");
const debug = require('debug')('express:')

const { DBURL, LOCALDB } = process.env;
mongoose.Promise = Promise;

const dbConnection = () => {
  mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
    .then(() => {
      debug(`Connected to Mongo on ${DBURL}`)
    }).catch(err => {
      dbConnection();
      debug('Error connecting to mongo, retrying', err)
    });
}
dbConnection()

const app = express()
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100
});


app.use(limiter);
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
app.use(bodyParser.json({ limit: '1mb' }))


//routing
const credits = require('./routes/credits')
const getMessages = require('./routes/getMessages');
const postMessage = require('./routes/postMessage')
app.use('/api/v3/credits', credits);
app.use('/api/v3/messages', getMessages);
app.use('/api/v3/messages', postMessage)


app.listen(9003)