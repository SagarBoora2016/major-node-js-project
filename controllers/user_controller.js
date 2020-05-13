const User = require("../models/user-sign-up");

module.exports.profile = function(req,res){
    // res.end("<h1>USer PRofile</h1>");
    if(req.cookies.user_id){
        User.findById({_id:req.cookies.user_id},function(err,user){
            if(err){
                console.log("Error in connecting to db");
                return;
            }
            if(user){
                return res.render("user-profile",{
                    title:"Profile Page",
                    user:user
                });
            }else{
                return res.redirect("/users/sign-in");
            }
        });
    }else{
        return res.redirect("/users/sign-in");
    }
   
}
module.exports.signUp = function(req,res){
    return res.render("user-sign-up",{
        title:"My sign up  page"
    });
}
module.exports.signIn = function(req,res){
    var ck = req.cookies;
    // console.log(ck);
    if(ck.user_id !=undefined){
        return res.redirect("/users/profile");
    }
    return res.render("user-sign-in",{
        title:"Sign In Page"
    });
}
module.exports.createSession =function(req,res){
    // console.log(req.cookies);
    req.cookie("user_id","1");
    User.findOne({email:req.body.email},function(err,user){
        //error in connecting to mongodb
        if(err){
            console.log("Error in connecting to mongo Db");
            return res.redirect("back");
        }else{
            //user found
            if(user){
                //user found
                // console.log(req.body);
                // console.log(user.password);
                if(user.password != req.body.password){
                    //different password
                    console.log("Password not matching.")
                    return res.redirect("back");
                }
                // console.log(user.id);
                res.cookie('user_id',user.id);

                
                return res.redirect("/users/profile");
            }else{
                //user not found in db
                console.log("User not in db");
            }
        }

    });

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
module.exports.signOut = function(req,res){
    res.clearCookie('user_id');
    return res.redirect("/users/sign-in");
}