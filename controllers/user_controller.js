const User = require("../models/user-sign-up");
module.exports.profile = function(req,res){
    // res.end("<h1>USer PRofile</h1>");
    console.log("Users profile");
    return res.render("user-profile",{
        title:"My title"
    });
}
module.exports.signUp = function(req,res){
    return res.render("user-sign-up",{
        title:"My sign up  page"
    });
}
module.exports.signIn = function(req,res){
    return res.render("user-sign-in",{
        title:"Sign In Page"
    });
}
module.exports.createSession =function(req,res){
    

    //To Do
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