const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function(req,res){
    // find if the post exist
    Post.findById(req.body.postid,function(err,post){
        if(err){
            console.log("No post found with the id");
            return;
        }
        Comment.create(
            {
                content:req.body.content,
                post:req.body.postid,
                user:req.user._id
            },
            function(err,comment){
                if(err){
                    console.log("error in creating comment");
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect("/");
            }
        )
    });
}