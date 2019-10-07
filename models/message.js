let mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;

let messageSchema = new mongoose.Schema({
    user: {
        type: Object_Id,
        ref: 'User'
    }, 
    message: {
        required: true,
        type: String,
    },
    date: {
        required: true,
        type: String
    },
    reciever: {
        type: Object_Id, 
        ref: 'Reciever'
    }
})


module.exports = mongoose.model('Message', messageSchema);