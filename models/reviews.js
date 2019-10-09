let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
  title: String,
  content: String,
  rating: Number,
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  goatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Review', reviewSchema);
