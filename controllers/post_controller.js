const Post = require("../models/post");
const passport = require("passport");
const Comment = require("../models/comment");

module.exports.create = async function(req,res){
    try{
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created"
            });
        }

        req.flash("success","Post Published.");
        return res.redirect("/");
    }catch(err){
        console.log(err);
    }
}
//delete post using destroy method
module.exports.destroy =async function(req,res){
    try{
        let post = await Post.findById(req.params.postid);
        await Post.findByIdAndDelete(post._id);
        //delete from comment db also where post id is same as post id
        await Comment.deleteMany({post:post.id});
        if(req.xhr){
            console.log("xhr");
            return res.status(200).json({
                data:{
                    post_id:req.params.postid
                },
                message:"Post Deleted Successfully"
            });
        }
        req.flash("success","Post and associated comments Deleted.");
        res.redirect("/");
    }catch(err){
        console.log(err);
        req.flash("error",er);
        return;
    }
}