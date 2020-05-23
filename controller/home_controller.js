// const Comment = require('../models/comment');
const Post = require('../models/post');

const User = require('../models/user');


module.exports.home = async function (req,res){
   // console.log(req.body);
    //console.log(req.cookies);



    // post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title: 'CODEIAL | HOME',
    //         posts: posts
    //     })

    // })


    // post.find({}).populate('user').exec(function(err,posts){
    //     return res.render('home',{
    //         title: 'CODEIAL | HOME',
    //         posts: posts
    //     });


    // });
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
        
        



        // if (err){console.log('Error in finding the post in home'); return;}

        let users = await User.find({})
        

        // console.log(post[0].comments);
    


        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users:users
        });

    }catch(err){
        console.log('error', err);
        return;
    }
   

}