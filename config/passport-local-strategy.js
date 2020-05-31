const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
}, function (email,password,done){
    //find a USER and stablish the identity
    User.findOne({email:email}, function(err,user){
        if (err){
            console.log('Error in finding the user --> passport', err);
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid email/password');
            return done(null,false)
        }
        return done(null,user);
    } )
    
}))

//serialize the user to decide which key ius to be kept in teh cokkie
passport.serializeUser(function(user,done){
    done(null,user.id)
});

//deserialize the user from teh key in the cookie

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null,user);
    });
});

// check the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if teh user is authenticated
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated){
        // req.user contains the current sighned in user from the session cookie and we are just sending this to tha locals for the
        //views 
        res.locals.user = req.user;
        return next();
    }
}

module.exports = passport;