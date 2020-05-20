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
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log("Error in founding comment");
            return;
        }
        var postId = comment.post;
        Post.findById(comment.post,function(err,post){
            if(err){
                console.log("Error in deleting coment from psot");
                return;
            }
            if(req.user.id == comment.user || comment.post == post.id ) {
                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err){
                    if(err){
                        console.log("Error in deleting coment from psot");
                        return;
                    }
                    comment.remove();
                    return res.redirect("/");
                });
            }
        });
        

    });
}   