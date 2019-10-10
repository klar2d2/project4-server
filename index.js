const http = require('http');
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')
const rowdyLogger = require('rowdy-logger')
const socketIO = require('socket.io')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express()
const rowdyResults = rowdyLogger.begin(app);
const server = http.createServer(app);
const io = socketIO(server);
const db = require('./models')
let recipient = null;
let currentUser = null;

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb' }))

app.post('/chat', (req,res) => {

  recipient = req.body.recipient;
  currentUser = req.body.currentUser
  res.send('hey there big face')
const nspObj = {}
nspObj[`${recipient}-${currentUser}`] = io.of(`/${recipient}-${currentUser}`)
nspObj[`${recipient}-${currentUser}`].on('connection', socket => {
    console.log('New client connected');
    socket.on('add message', (message, currentUser, recipient, tag) => {
        console.log('The Message added is: ', message, 'The user is:', currentUser, 'The goat is:', recipient);
        nspObj[`${recipient}-${currentUser}`].emit('add message', message)
        db.Message.create({
          message, 
          currentUser, 
          recipient
        })
        .then(() => {
          console.log('message created in db')
        })
        .catch(err => {
          console.log(err)
        })
      })

      socket.on('is typing', (currentUser) => {
        console.log(currentUser)
        socket.broadcast.emit('is typing', currentUser)
      })

      socket.on('disconnect', () => {
        console.log('user disconnected');
      })
    })
})


app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

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
app.use('/reviews', require('./controllers/reviews'))
app.use('/appointment',
  expressJwt({
    secret: process.env.JWT_SECRET
  }), require('./controllers/apppointment'))
app.use('/user', require('./controllers/user'))
app.get('*', (req,res) => {
  res.status(404).send({
    message: 'Not Found'
  })
})

server.listen(process.env.PORT, ()=>{
  rowdyResults.print()
})
