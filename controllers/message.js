const express = require('express');
const router = express();
const client = require('socket.io').listen(4000).sockets;
const db = require('../models')

router.get('/', (req, res) => {
    res.send('hello there big face');
})

module.exports = router;
