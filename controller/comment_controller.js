const  Comment = require('../models/comment');
const Post = require('../models/post')
const commentMailers = require('../mailers/comment_mailers');
const queue = require('../config/kue')
const commentEmailWorker = require('../workers/comment_email_worker');;

module.exports.create = async function(req,res){
    // console.log(req.body.post);
    // console.log(req.body);
    // console.log(req);

   let post = await Post.findById(req.body.post);
        // console.log(data);

        if (post){
            let comment = await Comment.create({
                content:req.body.content,
                user:req.user,
                post:req.body.post,
            })
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            // commentMailers.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in creating a queue');
                }

                console.log('job enqueued',job.id);
            });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message: "comment Created!"
        
                });
            }
            req.flash('success', 'Comment succefully');
            return res.redirect('/');
        }

        
    // Comment.create({
    //     content:req.body.content,
    //     user:req.user._id,
    //     post:req.post._id

    // }, function(err,comments){
    //     if(err){console.log('Error in creating the coments'); return;}

    //     return res.redirect('back');
    // })
}


module.exports.destroy =  async function(req,res){
    let comment = await Comment.findById(req.params.id)
    if(comment.user == req.user.id){

        let postId = comment.post;

        comment.remove();
        let post = await Post.findByIdAndUpdate(postId, { $pull:{comments:req.params.id }})
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message: "comment Created!"
    
            });
        }
            req.flash('success', 'Comment deleted');
            return res.redirect('back');
    }
        else  return res.redirect('back');

           
}
        
       
    
