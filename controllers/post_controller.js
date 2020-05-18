const Post = require("../models/post");
const passport = require("passport");

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