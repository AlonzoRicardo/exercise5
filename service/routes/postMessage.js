const express = require('express');
const router = express.Router();
const customValidator = require('../customValidator')
const axios = require('axios');
const Message = require('../models/MessageModel')

router.post('/', customValidator(), (req, res) => {
    let { destination, body } = req.body

    //check for file size in header instead of length
    if (destination.length < 100 && body.length < 100) {
        axios.post('http://localhost:3000/message', { destination, body })
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
    } else {
        res.send('Error body is too long')
    }
})

module.exports = router;