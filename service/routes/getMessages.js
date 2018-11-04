const express = require('express');
const router = express.Router();
const MessageModel = require('../models/MessageModel')

router.get('/', (req, res) => {

    MessageModel.find({})
        //.limit(5)
        .then(response => res.send(response))
        
})

module.exports = router;