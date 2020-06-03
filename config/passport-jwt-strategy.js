const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user-sign-up");

var opts = {
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :"sociel"
};
passport.use(new JWTStrategy(opts,function(JWTPayLoad,done){
    User.findById(JWTPayLoad._id,function(err,user){
        if(err){
            console.log("Error in passport jwt");return;
        }
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));
module.exports= passport; 