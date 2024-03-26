const  mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
    })

const Message = mongoose.model('Message', messageSchema, 'messages'); 

module.exports = Message;