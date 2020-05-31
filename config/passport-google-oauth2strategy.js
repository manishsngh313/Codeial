const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell the passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "78783454669-kg88m6bvnajtrod274gv4ea3d4jgchjq.apps.googleusercontent.com",
    clientSecret: "2Pan6Iloarw5MWyvebFBwUiH",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      //Find a user
    User.findOne({email: profile.emails[0].value }).exec(function (err, user) {
        if (err){console.log('Error in google strategy passport', err); return; }

        console.log(profile);

        if (user){
            //If found, set this user as req.user
            return done(null,user)
        } else {
            //If not create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err,user){
                if (err){console.log('Error in google strategy passport', err); return; }
                return done(null,user);

            });
        }
    });
}));

module.exports = passport;
