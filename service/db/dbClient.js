const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    reconnectTries: 5,
    reconnectInterval: 20000,
};

/* const Credit = mongoose.model('Credit', creditSchema);
Credit.collection.drop('Credit');

Credit.create(new Credit({}))
  .then(() => console.log('DB Initialization')); */

const connect = (url) => {
    return mongoose.createConnection(url, options, (err) => {
        if (err) {
            console.error('connection failed', err.message);
        } else {
            console.log(`Connected to Mongo on ${url}`)
        }
    });
};

module.exports = { connect };