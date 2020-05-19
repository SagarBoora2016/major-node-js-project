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
//delete comments using destryoy method
module.exports.destroy = function(req,res){
    console.log(req.query);
    // console.log(Post.comments);
    //delete comments from posts db
    Post.findById(req.query.postid,function(err,post){
        post.comments.remove(req.query.commentid);   
        post.save();     
        console.log("Doe");
    });
    //delete from comment DB
    Comment.findById(req.query.commentid,function(err,comment){
        if(err){
            console.log("No comment of this id");
            return;
        }
        Comment.findByIdAndDelete(req.query.commentid,function(err){
            if(err){
                console.log("No comment of this id");
                return;
            }
            return res.redirect("/");
        });
    });
}   