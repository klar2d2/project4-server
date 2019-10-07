require('dotenv').config()
const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')
const rowdyLogger = require('rowdy-logger')

const app = express()
const rowdyResults = rowdyLogger.begin(app)

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

app.use('/appointment',
  expressJwt({
    secret: process.env.JWT_SECRET
  }), require('./controllers/apppointment'))

app.get('*', (req,res) => {
  res.status(404).send({
    message: 'Not Found'
  })
})

app.listen(process.env.PORT, ()=>{
  rowdyResults.print()
})