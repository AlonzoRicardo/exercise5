const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  amount: { type: Number, default: 20 }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Credit = mongoose.model('Credit', creditSchema);
Credit.collection.drop('Credit');





module.exports = (database) => database.model('Credit', creditSchema);