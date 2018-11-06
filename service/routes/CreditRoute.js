const express = require('express');
const router = express.Router();

const ServiceController = require('../service-client/service-client')
const ServiceHandler = new ServiceController();

router.post('/credits', (req, res) => {
    ServiceHandler.addCredits(req, res)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
})

module.exports = router;