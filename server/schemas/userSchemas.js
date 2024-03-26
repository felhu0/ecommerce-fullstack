const  mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    })

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    };

const User = mongoose.model('User', userSchema, 'users'); 

module.exports = User;