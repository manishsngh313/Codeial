const Comment = require('../models/comment');
const Post = require('../models/post');

const User = require('../models/user');


module.exports.home = function (req,res){
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


    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){

        if (err){console.log('Error in finding the post in home'); return;}
        console.log(posts.comments);
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
    
}