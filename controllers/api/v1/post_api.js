const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index =async function(req,res){
    let post  = await Post.find({}).sort("-createdAt")
    .populate("user").populate({
        path:"comments",
        populate:{
            path:"users"
        }
    });
    return res.json(200,{
        message:"Yeah it is successful",
        posts:post
    });
}
module.exports.delete = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(req.user.id == post.user){
            await Post.findByIdAndDelete(post._id);
            //delete from comment db also where post id is same as post id
            await Comment.deleteMany({post:post.id});
            return res.status(200).json({
                message:"Post Deleted Successfully"
            });
        }else{
            return res.json(401,{
                message:"You cannot delete this post"
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in deleting"
        });
    }   
}