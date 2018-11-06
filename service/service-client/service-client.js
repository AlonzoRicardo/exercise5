require('dotenv').config();
//handlers
const handleSaveToBases = require('../handlers/handleSaveToBases')
const handleChargeToBases = require('../handlers/handleChargetoBases')
const handleMsgUpdateToBases = require('../handlers/handleMsgUpdateToBases')
const handleAddCreditToBases = require('../handlers/handleAddCreditsToBases')
//validators
const MessageStruct = require('../validator/message-struct');
const CreditStruct = require('../validator/credit-struct');
//modules
const axios = require('axios')
//configs
const delay = 5000;
const { MSGAPP, LOCALHOST } = process.env;
const { db1, db2, hierarchy } = require('../app');

function leaderDB(arr) {
  return arr[0];
}

function slaveDB(arr) {
  return arr[1];
}

class ServiceController {
  constructor() {
    this.service = axios.create({
      baseURL: MSGAPP,
      timeout: delay
    });
  };


  //SAVES
  saveMessage(destination, body, uuid) {
    console.log('enters save');
    MessageStruct({ destination, body, uuid })
    if (hierarchy.length > 1) {
      handleSaveToBases(destination, body, uuid, slaveDB(hierarchy), 'db2')
      return handleSaveToBases(destination, body, uuid, leaderDB(hierarchy), 'main db')
    } else {
      return handleSaveToBases(destination, body, uuid, leaderDB(hierarchy), 'main db')
    }
  }


  //CHARGE
  charge() {
    console.log('enter charge');
    if (hierarchy.length > 1) {
      console.log('enter 2 db');
      handleChargeToBases(slaveDB(hierarchy), 'db2')
      return handleChargeToBases(leaderDB(hierarchy), 'main db')
    } else {
      console.log('enters only 1 db', hierarchy.length);
      return handleChargeToBases(leaderDB(hierarchy), 'main db')
    }
  }


  //SENDS
  sendMessage(destination, body, uuid, res) {
    console.log('enters send');
    this.service.post('/message', { destination, body, uuid })
      .then(() => {
        this.updateMessageStatus(uuid, true, true)
          .then((resp) => {
            res.status(200).send(resp)
          })
      })
      .catch((err) => {
        err.message == `timeout of ${delay}ms exceeded`
          ?
          this.updateMessageStatus(uuid, true, false)
            .then(() => {
              res.status(200).send('Sent but not confirmed')
            })
          :
          res.status(500).send(err.message)
      })
  };

  //ADD BALANCE
  addCredits(req) {
    const { amount } = req.body
    CreditStruct({ amount })
    if (hierarchy.length > 1) {
      handleAddCreditToBases(slaveDB(hierarchy), amount)
      return handleAddCreditToBases(leaderDB(hierarchy), amount)
    } else {
      return handleAddCreditToBases(leaderDB(hierarchy), amount)
    }
  }


  //UPDATES
  updateMessageStatus(uuid, sent, confirmed) {
    if (hierarchy.length > 1) {
      handleMsgUpdateToBases(uuid, sent, confirmed, slaveDB(hierarchy))
      return handleMsgUpdateToBases(uuid, sent, confirmed, leaderDB(hierarchy))
    } else {
      return handleMsgUpdateToBases(uuid, sent, confirmed, leaderDB(hierarchy))
    }
  }
};

module.exports = ServiceController;