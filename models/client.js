let mongoose = require('mongoose')


let clientSchema = new mongoose.Schema({
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  address: { 
    type: Schema.Types.ObjectId, 
    ref: 'Address'
  }
})

exports.modules = mongoose.model('Client', clientSchema);