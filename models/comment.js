const mongoose = require('mongoose');
// const User = require('../models/user');
// const Post = require('../models/post');


const commentSchema =  mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    // comment belongs to user
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;