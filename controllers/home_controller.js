const Post = require("../models/post")
module.exports.home= function(req,res){
    // console.log("home");
    // console.log(req.cookies);
    // res.cookie("user_id","100");
    // res.cookie("something","thats rifht 2 times");
    if(req.user){
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
                posts:posts
            });
        });
    }else{
        return res.render("home",{
            title: "This is my Title.",
            posts:undefined
        });
    }
    
}
