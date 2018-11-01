const express = require('express');
const router = express.Router();
const axios = require('axios');
const MessageModel = require('../models/MessageModel')
const MessageStruct = require('../validator/message-struct')

router.post('/', (req, res) => {
    let { destination, body } = req.body

    try {
        MessageStruct({ destination, body })
        
        axios.post('http://messageapp:3000/message', { destination, body })
            .then(() => {
                new MessageModel({
                    destination,
                    body
                })
                    .save()
                    .then(savedUser => savedUser)
            })
            .then(() => {
                res.status(200).send('Succesful');
            })
            .catch((err) => {
                res.status(500).send('error');
            })
    } catch (err) {
        throw err
    }

})

module.exports = router;