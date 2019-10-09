let mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;

let messageSchema = new mongoose.Schema({
    user: {
        type: Object_Id,
        ref: 'User',
    }, 
    message: {
        type: String,
    }
})


module.exports = mongoose.model('Message', messageSchema);