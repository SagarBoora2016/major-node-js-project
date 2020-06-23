const Post = require("../models/post");
const passport = require("passport");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function(req,res){
    try{
            let post1= await Post.create({
                content:req.body.content,
                user:req.user._id
            });
            let post = await Post.findById({_id:post1.id}).populate("user","name");
            // let post  = post1.populate("user");
            // console.log(post);
            if(req.xhr){
            // post.populate("user");
            
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
        if(post.user==req.user.id){
            // console.log(post);
            await Like.deleteMany({likeable:post,onModel:"Post"});
          //getting error here,
            // console.log(post.comments);
            await Like.deleteMany({_id:{$in:post.comments}});
            // this one, it runs but database se delete nhi hota
            for(comment of post.comments){
                await Like.deleteOne({likeable:comment, onModel:"Comment"});
            }


            await Post.findByIdAndDelete(post._id);
            //delete from comment db also where post id is same as post id
            await Comment.deleteMany({post:post.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.postid
                    },
                    message:"Post Deleted Successfully"
                });
            }
            req.flash("success","Post and associated comments Deleted.");
            res.redirect("/");
        }else{
            req.flash("Error","Internal Server Error");
            res.redirect("/");
        }
        
    }catch(err){
        console.log(err);
        req.flash("error",err);
        return;

    }
}