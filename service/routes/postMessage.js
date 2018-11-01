const express = require('express');
const router = express.Router();
const axios = require('axios');
const Message = require('../models/MessageModel')
const MessageStruct = require('./contract')

router.post('/', (req, res) => {
    let { destination, body } = req.body

    try {

        MessageStruct({ destination, body })
        
        axios.post('http://messageapp:3000/message', { destination, body })
            .then(() => {
                new Message({
                    destination,
                    body
                })
                    .save()
                    .then(savedUser => console.log(savedUser))
            })
            .then(() => {
                res.status(200).send('Succesful');
            })
            .catch((err) => {
                res.status(500).send('error');
            })
    } catch (e) {
        throw e
    }


})

module.exports = router;