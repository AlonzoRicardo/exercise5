const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const MessageModel = require('../models/MessageModel')

const ServiceController = require('../service-client/service-client')
const ServiceHandler = new ServiceController();

let throttledQueue = require('throttled-queue');
let throttle = throttledQueue(1, 10000); // at most make 1 request every second.


router.post('/messages', (req, res) => {
    throttle(function () {
        let uuid = uuidv1();
        let { destination, body } = req.body;
        
        ServiceHandler.charge()
        .then(response => {
            console.log(response);
            if(response === null) {
                res.send('insuficient credits')
            } else {
                ServiceHandler.saveMessage(destination, body, uuid)
                .then(() => {
                    ServiceHandler.sendMessage(destination, body, uuid, res)
                })
            }
        })
    })
})


router.get('/messages', (req, res) => {
    MessageModel.find({})
        //.limit(5)
        .then(response => res.send(response))
})

module.exports = router;