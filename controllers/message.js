const express = require('express');
const router = express();
const client = require('socket.io').listen(4000).sockets;
const db = require('../models')

//SOCKET SETUP

client.on('connection', (socket)=> {
    console.log('made a socket connection', socket.id)

    socket.on('chat', (data)=> {
        db.Message.findOne()
        .then()
        .catch(err => {
            console.log(err);
        })
        client.sockets.emit('chat', data);
    })
    //Emit the message
    db.Message.find().limit(50).sort({_id:1})
    .then()
    .catch(err => {
        console.log(err)
    })

})


module.exports = router;
