const passport = require("passport");
const User = require("../models/user-sign-up");

const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy({
        usernameField:"email"
    },
    function(email,password,done){
        console.log(email);
        User.findOne({email:email},function(err,user){
            console.log("We are here");
            if(err){
                console.log("Error in connecting to DB");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("User not valid");
                return done(null,false);
            }    
            console.log("User found");
            return done(null,user);
        });
        }
    )
);
//Serailiging the user with cookie
passport.serializeUser(function(user, done) {
    console.log("Serialize Done");
    done(null, user.id);
    
});

//Deserialiginf the data
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error is connecting to user");
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;