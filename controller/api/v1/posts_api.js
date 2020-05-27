const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){


    try {
        let posts =  await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
            {
            path: 'comments',
            populate: {
                path: 'user'
            }
            
        }
        ).sort('-createdAt');
    
        
    


        return res.json(200,{
            message: 'list of posts',
            posts: posts
        });
    }catch(err){
        console.log('error', err);
        return;
    }
}

module.exports.destroy = async function (req,res){

    try {
        let post = await Post.findById(req.params.id)
        // .id means converting the object id into string and mongoose do this for us
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            
            return res.json(200, {
                massage:'post and associated comments are  deleted'
            });
            return res.json(200, {
                message: 'posts and associated comments are deleted'
            });
        }
        else{
            return res.json(401,{
                message: 'you can not delete this post!'
            })
        }

      
    } catch (error) {
        console.log('*******', error);
        return res.json(500, {
            massage:'error in deleting the post'
        })
        
    }

}
   