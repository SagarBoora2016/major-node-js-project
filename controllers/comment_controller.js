const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create =async function(req,res){
    // find if the post exist
    try{
        let post =await Post.findById(req.body.postid);
        let comment = await Comment.create({
                content:req.body.content,
                post:req.body.postid,
                user:req.user._id
            });
        post.comments.push(comment);
        post.save();
        return res.redirect("/");
    }catch(err){
        console.log(err);
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
            return res.redirect("/");
        }
    }catch(err){
        console.log(err);
        return;
    }
}   