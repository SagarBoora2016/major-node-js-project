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
//delete post using destroy method
module.exports.destroy =async function(req,res){
    try{
        let post = await Post.findById(req.params.postid);
        await Post.findByIdAndDelete(post.id);
        //delete from comment db also where post id is same as post id
        await Comment.deleteMany({post:post.id});
        res.redirect("/");
    }catch(err){
        console.log(err);
        return;
    }
}