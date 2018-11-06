const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  reconnectTries: 100,
  reconnectInterval: 5000
};

const connect = url => {
  return mongoose.createConnection(url, options, err => {
    if (err) {
      console.error("connection failed", err.message);
    } else {
      console.log(`Connected to Mongo on ${url}`);
    }
  });
};

module.exports = { connect };
