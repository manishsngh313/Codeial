// const User = require('../models/user');
const Post = require('../models/post');
const Comment = require ('../models/comment')


module.exports.createPost = async function (req , res){
    
    let post =  await Post.create({
        content: req.body.content,
        user:req.user
    });

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message: "Post Created!"

        });
    }
    req.flash('success', 'You have posted successfully');



    return res.redirect('back');
    
}

module.exports.destroy = async function (req,res){
    let post = await Post.findById(req.params.id)
        // .id means converting the object id into string and mongoose do this for us
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message: "Post Created!"
        
                });
            }
            req.flash('success', 'You have deleted post successfully');
            return res.redirect('back'); 
        } else {
            return res.redirect('back');
        }

}