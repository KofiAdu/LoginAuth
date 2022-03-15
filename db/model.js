const mongoose = require('mongoose')

//creating schema 
let userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

//creating model
let User = mongoose.model('User',userSchema)

module.exports = User