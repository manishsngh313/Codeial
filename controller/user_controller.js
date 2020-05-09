const User = require('../models/user')
const passport = require('passport')

module.exports.home = function (req,res){
    return res.render('profile', {
        title:'users profile'
    })
}

module.exports.signIn = function (req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codeial | sign in"
    })
}

module.exports.signUp = function (req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codeial | sign up"
    });
}
 
// get the signup data 
module.exports.create = function (req,res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back'); 
    }
    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err,user){
                if (err){console.log('error in creating the user while signing up'); return ;}

                return res.redirect('/users/sign-in');
            });
        } 
        else {
            return res.redirect('back');
        }
        
    });


}

//get the signin data
module.exports.createSession = function (req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}