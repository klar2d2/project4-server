let mongoose = require('mongoose')

let addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  location: {},
  state: String,
  street: String,
  streetNumber: String,
  zipcode: String
})s


module.exports = mongoose.model('Address', addressSchema);
