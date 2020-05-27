const User = require('../models/user')
const passport = require('passport')
var multer  = require('multer');
const fs = require('fs');
const path = require('path');

module.exports.home = function (req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile', {
            title:'users profile',
            profile_user:user
        });
    });
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body , function(err,user){
    //         if(err){console.log('error in updating the user details'); return ;}
    //         req.flash('success', 'You have updated user details successfully');
    //         return res.redirect('back');
    //     })
    // } else {
    
    //     return res.status(401).send('unatharise');
    // }
    if(req.user.id == req.params.id){

        try {
            let user = await User.findById(req.params.id);
            // console.log(user);
            User.uploadedAvatar(req,res,function(err){
                if (err){ console.log('****Multer error:', err)}

                // console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        if (fs.existsSync(path.join(__dirname,'..', user.avatar))) {
                            //file exists
                            fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                        }

                       
                    }
                    //this is saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
            
        } catch (err) {
            req.flash('error', err);    
            return res.redirect('back');
            
        }


    } else {
        req.flash('error', 'Unotharised');
        return res.status(401).send('unatharise');
   
    }
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
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.flash('success', 'you are logged out');
    req.logout();
    return res.redirect('/');
}
