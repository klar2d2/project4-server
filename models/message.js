let mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;

let messageSchema = new mongoose.Schema({
    user: {
        type: Object_Id,
        ref: 'User',
    }, 
    message: {
        type: String,
    },
    date: {
        type: String,
    },
    goat: {
        type: Object_Id, 
        ref: 'Goat',
    }
})


module.exports = mongoose.model('Message', messageSchema);