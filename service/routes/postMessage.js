const express = require('express');
const router = express.Router();
const axios = require('axios');
const MessageModel = require('../models/MessageModel');
const MessageStruct = require('../validator/message-struct');
const CreditModel = require('../models/CreditModel');

/* const Service = require('./message-client');
const messageClient = new Service(); */

router.post('/', (req, res) => {
    let { destination, body, uuid } = req.body;
    let status = {
        sent: false,
        confirmed: false
    };
    let globalCredit;


    try {
        //MessageStruct will returned detailed information if the fields provided are not properly formated.
        MessageStruct({ destination, body, uuid, status })

        CreditModel.findOne({ "GC": 1 }).then((response) => {
            globalCredit = response.amount

            if (globalCredit < 5) {
                res.status(403).send('Insuficient credits')
            } else {
                let newMsg = new MessageModel({
                    destination,
                    body,
                    uuid,
                    status
                })

                newMsg.save()
                    .then(savedMsg => savedMsg)
                    .catch(err => err.message)

                axios({
                    method: 'post',
                    url: 'http://messageapp:3000/message',
                    timeout: 3000,
                    data: { destination, body, uuid, status }
                })
                    .then(() => {
                        MessageModel.findOneAndUpdate({ uuid }, { $set: { "status": { "sent": true, "confirmed": true } } })
                            .then(() => CreditModel.findOneAndUpdate({}, { $inc: { "amount": -5 } }))
                        res.status(200).send('Succesful')
                    })
                    .catch((err) => {
                        err.message == 'timeout of 3000ms exceeded'
                            &&
                            MessageModel.findOneAndUpdate({ uuid }, { $set: { "status": { "sent": true, "confirmed": false } } })
                                .then(() => CreditModel.findOneAndUpdate({}, { $inc: { "amount": -5 } }))

                        res.status(500).send(err.message)
                    })
            }
        })

    } catch (e) {
        throw e
    }
})

module.exports = router;