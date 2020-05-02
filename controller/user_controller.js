const User = require('../models/user')

module.exports.home = function (req,res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function (err,user){
            if(err){console.log('error in finding in cookies');return;}
                if(user){
                    return res.render('profile', {
                        user: user,
                        title:'users profile'
            });
            }
            else{
                return res.redirect('/sign-in');
            }
        })
    }
    else {
        return res.redirect('/users/sign-in');
    }
    
}

module.exports.signIn = function (req,res){
    return res.render('user_sign_in',{
        title:"codeial | sign in"
    })
}

module.exports.signUp = function (req,res){
    return res.render('user_sign_up',{
        title:"codeial | sign up"
    });
}
 
// get the signup data 
module.exports.create = function (req,res){
    //to do later
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
    User.findOne({email:req.body.email}, function (err,user){
        if (err){
            console.log('error in creating session while sign in');
            return;
        }

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back')
            }
    
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
    
    
        }else{
            return res.redirect('back');
        }
    
    }
    );

}

module.exports.signOut = function(req,res){
    res.clearCookie('user_id');
    // console.log(res.cookies);
    // console.log(req.cookies);
    return res.redirect('back');
}