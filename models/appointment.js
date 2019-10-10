let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
  clientId: String,
  goatId: String,
  goatName: String,
  date: Date,
  location: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
