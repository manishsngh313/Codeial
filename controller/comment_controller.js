const  Comment = require('../models/comment');
const Post = require('../models/post')


module.exports.create = function(req,res){
    console.log(req.body.post);
    console.log(req.body);
    // console.log(req);

    Post.findById(req.body.post,function(err,post){
        if(err){console.log('Error in finding the post while commenting'); return;}

        if (post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,
        
            }, function(err,comment){
                if(err){console.log('Error in creating the coments'); return;}
                console.log(comment);
                post.comments.push(comment);
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


module.exports.destroy =  function(req,res){
    Comment.findById(req.params.id, function (err,comment){
        if(err){console.log('Eroor')}

        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull:{comments:req.params.id }},function(err,post){
                return res.redirect('back');
            });

           

        }
        else  return res.redirect('back');
       
    })
}