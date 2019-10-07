const express = require('express');
const socket = require('socket.io')
const router = express();

//SOCKET SETUP
let io = socket(router);

io.on('connection', (socket)=> {
    console.log('made a socket connection', socket.id)

    socket.on('chat', (data)=> {
        io.sockets.emit('chat', data);
    })
})


module.exports = router;
