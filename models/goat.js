let mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;


let goatSchema = new mongoose.Schema({
   user: {
       type: Object_Id, 
       required: true
   }
})

module.exports = mongoose.model('Goat', goatSchema);
// let mongoose = require('mongoose')
// let addressSchema = require('./address')
//
// let goatSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true
//   },
//   lastname: String,
//   address: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Address',
//      },
//   reviews: Array,
// })
//
//
// module.exports = mongoose.model('Goat', goatSchema);
