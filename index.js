require('dotenv').config()
const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')
const rowdyLogger = require('rowdy-logger')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const rowdyResults = rowdyLogger.begin(app);
const server = http.createServer(app);
const io = socketIO(server);
const db = require('./models')

io.on('connection', socket => {
  console.log('New client connected');
  
  socket.on('add message', (message, userId, goatId) => {
    console.log('The Message added is: ', message, 'The user is', userId, 'The goat is', goatId);
    io.sockets.emit('add message', 'we all gonna diaiaiaiiiee!')
    db.Message.create({
      message: message
    })
    .then(() => {
      console.log('message created in db')
    })
    .catch(err => {
      console.log(err)
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb' }))

app.use('/auth', 
  expressJwt({
    secret: process.env.JWT_SECRET
  })
  .unless({
    path: [
      { url: '/auth/login', methods: ['POST'] },
      { url: '/auth/signup', methods: ['POST'] }
    ]
}), require('./controllers/auth'))

app.use('/message', require('./controllers/message'));

app.get('*', (req,res) => {
  res.status(404).send({
    message: 'Not Found'
  })
})

server.listen(process.env.PORT, ()=>{
  rowdyResults.print()
})