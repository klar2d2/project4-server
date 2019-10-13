require('dotenv').config()
const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')
const rowdyLogger = require('rowdy-logger')
const socketIO = require('socket.io')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express()
const rowdyResults = rowdyLogger.begin(app);
const http = require('http')
const server = http.createServer(app);
const io = socketIO(server);
const db = require('./models')
const nspObj = {}

nsp.on('connection', socket => {
  console.log('New client connected');

  socket.on('add message', (message, userId, goatId) => {
    console.log('The Message added is: ', message, 'The user is', userId, 'The goat is', goatId);
    nsp.emit('add message', message)
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

  socket.on('is typing', (userId) => {
    console.log(userId)
    socket.broadcast.emit('is typing', userId)
  })
  
app.use(cors())
io.set('origins', 'http://localhost:3000')
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb' }))

app.post('/chat', (req,res) => {
  goatId = req.body.goatId;
  userId = req.body.userId;
  res.send('hey there big face')
  const chatId = `${userId}-${goatId}`
  db.User.updateOne(
    {_id: userId},
    {$push: { chats: chatId }}
  )
  .then(()=>{
    db.User.updateOne(
      {_id: goatId},
      {$push: { chats: chatId }}
    )
    .then(()=>{
      nspObj[chatId] = io.of(`/${userId}-${goatId}`)
      nspObj[chatId].on('connection', socket => {
          console.log('New client connected');
          socket.on('add message', (message, user, recipient) => {
            console.log('The Message added is: ', message, 'The user is:', user, 'The goat is:', recipient);
            nspObj[`${userId}-${goatId}`].emit('add message', message)
            db.Message.create({
              message,
              goatId,
              userId,
              chatId
            })
            .then(() => {
              console.log('message created in db')
            })
            .catch(err => {
              console.log(err)
            })
          })
          socket.on('is typing', (userId) => {
            console.log(userId)
            socket.broadcast.emit('is typing', userId)
          })

          socket.on('disconnect', () => {
            console.log('user disconnected');
          })
      })
    })
  })
})


app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Goats are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.use('/auth',
  expressJwt({
    secret: process.env.JWT_SECRET
  })
  .unless({
    path: [
      { url: '/auth/all', methods: ['GET'] },
      { url: '/auth/login', methods: ['POST'] },
      { url: '/auth/signup', methods: ['POST'] }
    ]
}), require('./controllers/auth'))

app.use('/message', require('./controllers/message'));
app.use('/reviews',
  expressJwt({
  secret: process.env.JWT_SECRET
}), require('./controllers/reviews'))
app.use('/appointment',
  expressJwt({
    secret: process.env.JWT_SECRET
  }), require('./controllers/appointment'))
app.use('/user', require('./controllers/user'))

app.get('*', (req,res) => {
  res.status(404).send({
    message: 'Not Found'
  })
})

server.listen(process.env.PORT, ()=>{
  rowdyResults.print()
})
