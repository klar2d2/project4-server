let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
  clientId: String,
  goatId: String,
  startDate: Date,
  endDate: Date,
  location: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);