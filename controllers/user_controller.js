const User = require("../models/user-sign-up");
const passport = require("passport");

module.exports.profile =async function(req,res){
    // res.end("<h1>USer PRofile</h1>");
    let user1 = await User.findById(req.user.id).
    populate({
        path:"friendship",
        populate:{
            path:"from_user"
        }
    }).
    populate({
        path:"friendship",
        populate:{
            path:"to_user"
        }
    });
    // console.log(user1);
    var ans= false;
    User.findById(req.params.id,function(err,user){
        
        for(friend of user1.friendship){
            if(friend.from_user._id == req.params.id || friend.to_user._id == req.params.id){
                ans = true;
                break;
            }
        }
        return res.render("user-profile",{
            title:"My title",
            current_user:user,
            isfriend:ans
        });
    });
    
}
module.exports.update= function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect("/");
        });
    }else{
        return res.status(401).send("Unauthorized user");
    }
}
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        console.log("user is logged in");
        return res.redirect("/users/profile");
    }
    return res.render("user-sign-up",{
        title:"My sign up  page"
    });
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        console.log("user is logged in");
        return res.redirect("/users/profile");
    }
    return res.render("user-sign-in",{
        title:"Sign In Page"
    });
}
module.exports.createSession = function(req, res){
    req.flash("success","Logged In Successfully");
    return res.redirect('/');
}

module.exports.create = function(req,res){
    //TO Do
    // console.log('here');
    // console.log(req.body);
    // console.log(req.body.password);
    // console.log(req.body.confirm_password);
    
    if(req.body.password != req.body.confirm_password){
        console.log("Passwords Not Equal");
        return res.redirect("back");
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user");
            return res.redirect("back");
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user");
                    console.log(err);
                    return res.redirect("back");
                }
                console.log("User Created");
                return res.redirect("/users/sign-in");
            });
        }else{
            console.log("User already exists");
            return res.redirect("back");
        }
    }); 
}

module.exports.signOut = function(req,res){
    req.flash("success","Logged Out Successfully");
    req.logout();
    res.redirect('/');
}