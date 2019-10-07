let mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;


let recieverSchema = new mongoose.Schema({
   user: {
       type: Object_Id, 
       required: true
   }
})

module.exports = mongoose.model('Reciever', recieverSchema);