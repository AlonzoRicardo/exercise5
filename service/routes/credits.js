const express = require('express');
const router = express.Router();
const CreditModel = require('../models/CreditModel');
const CreditStruct = require('../validator/credit-struct');

router.post('/', (req, res) => {
    const { amount } = req.body
    
    try {
        CreditStruct({ amount })

        CreditModel.findOneAndUpdate({"GC": 1}, { $inc: { "amount": amount } })
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })

    } catch (err) {
        throw err
    }
})

module.exports = router;