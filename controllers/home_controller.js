const Post = require("../models/post");
const User = require("../models/user-sign-up");

module.exports.home= function(req,res){
    User.find({},function(err,users){

        Post.find({}).populate("user").
        populate({
            path:'comments',
            populate:{
                path:"user"
            }
        })
        .exec(function(err,posts){
            if(err){
                console.log("Error in connecting to Db");
                return;
            }
            return res.render("home",{
                title: "This is my Title.",
                posts:posts,
                all_users:users
            });
        });
    });

}
