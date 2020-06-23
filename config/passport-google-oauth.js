const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user-sign-up");

const env = require("../config/environment");

passport.use(new googleStrategy ({
    clientID:env.google_clientId,
    clientSecret:env.google_secret,
    callbackURL:env.google_callbackURL
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