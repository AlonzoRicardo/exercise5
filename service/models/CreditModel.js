const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const creditSchema = new Schema({
  GC: {type: Number, default: 1},
  amount: {type: Number, default: 100}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Credit = mongoose.model('Credit', creditSchema);

let entry = new Credit({
    GC: 1,
    amount: 200
})

Credit.collection.drop('Credit');
Credit.create(entry).then(() => console.log('DB Initialization'));

module.exports = Credit;