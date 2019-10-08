const express = require('express');
const router = express();
const db = require('../models')

router.get('/', (req, res) => {
    db.Message.find()
    .then(() => {
        res.send('Hello there big face')
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;
