const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user-sign-up");
passport.use(new googleStrategy ({
    clientID:"9481299943-no7q28ioc39is3t93l7jjjtapbib33tn.apps.googleusercontent.com",
    clientSecret:"7qM0HCcp4x5het6Nf0uMR92t",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("no user");
                return;
            }          
            console.log(profile + " profile");
            if(user){
                return done(null,user);
            }else{
                User.create({
                   name:profile.displayName,
                   email:profile.emails[0].value,
                   password:crypto.randomBytes(20).toString("hex") 
                },function(err,user){
                    if(err){
                        console.log("error in creating user");
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    })
);
module.exports = passport;