const express = require('express');
const router = express();
const client = require('socket.io').listen(4000).sockets;

//SOCKET SETUP

client.on('connection', (socket)=> {
    console.log('made a socket connection', socket.id)

    socket.on('chat', (data)=> {
        client.sockets.emit('chat', data);
    })
})


module.exports = router;
