const express = require('express');
const router = express.Router();
const Message = require('../models/MessageModel')

router.get('/', (req, res) => {

    Message.find({})
        //.limit(5)
        .then(response => res.send(response))
        
})

module.exports = router;