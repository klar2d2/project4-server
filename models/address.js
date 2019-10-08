let mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
  streetNumber: String,
  street: String,
  city: String,
  state: String,
  zipcode: String
})

module.exports = mongoose.model('Address', addressSchema);
