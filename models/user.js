const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password :{
        type : String,
        required : true,
        minlength : 7
    }
})

const User = mongoose.model('user',userSchema)

module.exports = User