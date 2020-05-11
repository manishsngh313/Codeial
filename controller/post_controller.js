// const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')


module.exports.createPost = function (req , res){
    
    Post.create({
        content: req.body.content,
        user:req.user._id
    }, function(err,post){
        if(err){
            console.log('error in creating the post')
            return;
        }
        return res.redirect('back');
    });


}

module.exports.destroy = function (req,res){
    Post.findById(req.params.id, function(err,post){
        if (err){console.log('Error in finding the post while deleting'); return;}
        // .id means converting the object id into string and mongoose do this for us
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id}, function(err){
                if(err){console.log('Error in deleting the comments while deleting post'); return;}

                return res.redirect('back')

            } )
        } else {
            return res.redirect('back');
        }
    });
}