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

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is authenticated
    if(req.isAuthenticated()){
        //user signed in , pass him
        return next();
    }
    //send to user sign in page
    return res.redirect("/users/sign-in");
}
//send details for user to response
passport.setAuthenticatedUser = function(req,res,next){ 
    //check if user is authenticated
    if(req.isAuthenticated()){
        //send details of user to response
        res.locals.user = req.user;
    }
    //send him next
    return next();

}

module.exports = passport;