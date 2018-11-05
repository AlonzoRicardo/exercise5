require('dotenv').config();

const axios = require('axios')
const MessageModel = require('../models/MessageModel');
const MessageStruct = require('../validator/message-struct');
const CreditModel = require('../models/CreditModel');

const { MSGAPP, LOCALHOST } = process.env;
const delay = 5000;

class ServiceController {
  constructor() {
    this.service = axios.create({
      baseURL: MSGAPP,
      timeout: delay
    });
  };



  saveMessage(destination, body, uuid) {
    //MessageStruct will returned detailed information if the fields provided are not properly formated.
    //Basically a validator
    MessageStruct({ destination, body, uuid })
    let newMsg = new MessageModel({
      destination,
      body,
      uuid,
      status
    })
    return newMsg.save()
  }



  charge() {
    return CreditModel.findOneAndUpdate({ "amount": { $gte: 5 } }, { $inc: { "amount": -5 } })
  }



  sendMessage(destination, body, uuid, res) {
    this.service.post('/message', { destination, body, uuid })
      .then(() => {
        this.updateMessageStatus(uuid, true, true)
          .then((resp) => {
            res.status(200).send('updated succefully', resp)
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



  updateMessageStatus(uuid, sent, confirmed) {
    return MessageModel.findOneAndUpdate({ uuid }, { $set: { "status": { sent, confirmed } } }, { new: true })
  }
};

module.exports = ServiceController;