const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create =async function(req,res){
    // find if the post exist
    // console.log(req.body);
    try{
       
        let post =await Post.findById(req.body.postid);
        let comment = await Comment.create({
                content:req.body.content,
                post:req.body.postid,
                user:req.user._id
            });
        console.log(comment);
        post.comments.push(comment);
        post.save();
        if(req.xhr){
            console.log("Inside");
            return res.status(200).json({
                data:{
                    comment:comment,
                    post:post
                },
                message:"Comment Created"
            });
        }
        
        req.flash("success","Comment Published.")
        return res.redirect("/");
    }catch(err){
        console.log(err);
        req.flash("error",err);
        return;     
    }
}
//delete comments using destryoy method
module.exports.destroy =async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        var postId = comment.post;
        let post=await Post.findById(comment.post);
        if(req.user.id == comment.user || comment.post == post.id ) {
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            comment.remove();
            req.flash("success","Comment Deleted.");
            return res.redirect("/");
        }
    }catch(err){
        req.flash("error",err);
        console.log(err);
        return;
    }
}   