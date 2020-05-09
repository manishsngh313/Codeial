const  Comment = require('../models/comment');
const Post = require('../models/post')


module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){console.log('Error in finding the post while commenting'); return;}

        if (post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id,
        
            }, function(err,comments){
                if(err){console.log('Error in creating the coments'); return;}

                post.comments.push(content);
                post.save();
        
                return res.redirect('/');
            })

        }
    })
    
    // Comment.create({
    //     content:req.body.content,
    //     user:req.user._id,
    //     post:req.post._id

    // }, function(err,comments){
    //     if(err){console.log('Error in creating the coments'); return;}

    //     return res.redirect('back');
    // })
}