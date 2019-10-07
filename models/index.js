require('dotenv').config();
let mongoose = require('mongoose')
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports.Appointment = require('./appointment')
module.exports.User = require('./user')