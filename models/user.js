const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:string,
        required:true
    },
    name:{
        type:string,
        required:true
    }
}, {
    timestarps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;