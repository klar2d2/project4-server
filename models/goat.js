let mongoose = require('mongoose')
let addressSchema = require('./address')

let goatSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: String,
  address: addressScema,
  reviews: Array,
})


module.exports = mongoose.model('Goat', goatSchema);
