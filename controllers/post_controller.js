const Post = require("../models/post");
const passport = require("passport");
const Comment = require("../models/comment");
module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log("Error is conecting to Db");
            return;
        }
        return res.redirect("/");
    });
}
module.exports.destroy = function(req,res){
    Post.findById(req.params.postid,function(err,post){
        if(err){
            console.log("Error in finding post");
            return;
        }
        Post.findByIdAndDelete(post.id,function(err){
            if(err){
                console.log("Error in deleting post");
                return;
            }
            Comment.deleteMany({post:post.id},function(err){
                if(err){
                    console.log("Error in deleting comment");
                    return;
                }
                res.redirect("/");
            })
        });
    });
}