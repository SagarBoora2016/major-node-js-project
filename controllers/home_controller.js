const Post = require("../models/post");
const User = require("../models/user-sign-up");

module.exports.home= async function(req,res){
    try{
        let users = await User.find({});
        let posts = await Post.find({}).sort("-createdAt")
        .populate("user").
            populate({
                path:'comments',
                populate:{
                    path:"user"
                },
                populate:{
                    path:"likes"
                }
            }).populate("likes");
        
        return res.render("home",{
            title: "This is my Title.",
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log(err);
        return;
    }
}
