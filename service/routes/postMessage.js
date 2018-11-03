const express = require('express');
const router = express.Router();
const axios = require('axios');
const MessageModel = require('../models/MessageModel')
const MessageStruct = require('../validator/message-struct')

router.post('/', (req, res) => {
    let { destination, body, uuid } = req.body

    let status = {
        sent: false,
        confirmed: false
    }

    try {
        MessageStruct({ destination, body, uuid, status })

        let newMsg = new MessageModel({
            destination,
            body,
            uuid,
            status
        })

        newMsg.save()
            .then(savedMsg => {
                console.log('SAVED MESSAGE HERE', savedMsg)
            })
            .catch(err => console.log('SAVING ERROR', err.message))

        
        axios({
            method: 'post',
            url: 'http://messageapp:3000/message',
            timeout: 3000,
            data: { destination, body, uuid, status }
            })
            .then(() => {
                MessageModel.findOneAndUpdate({uuid}, { $set: { "status": { "sent": true, "confirmed": true } } })
                res.status(200).send('Succesful');
            })
            .catch((err) => {
                err.message == 'timeout of 3000ms exceeded' 
                && 
                MessageModel.findOneAndUpdate({uuid}, { $set: { "status": { "sent": true, "confirmed": false } } })
                res.status(500).send('error', err.message);
            })
    } catch (err) {
        throw err
    }

})

module.exports = router;