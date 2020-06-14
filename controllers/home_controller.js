const Post = require("../models/post");
const User = require("../models/user-sign-up");
const Friendship = require("../models/friendship");

module.exports.home= async function(req,res){
    try{
        let users = await User.find({});
        let posts = await Post.find({}).sort("-createdAt")
        .populate("user").
            populate({
                path:'comments',
                populate:{
                    path:"user"
                },
                populate:{
                    path:"likes"
                }
            }).populate("likes");
            // console.log(users);
            // let from_user =await Friendship.find({from_user:req.user._id}).populate("to_user");
            // .populate("from_user to_user");
            // let to_user = await Friendship.find({to_user:req.user._id}).populate("to_user");
            // .populate("from_user to_user");
            // console.log(from_user + "from user");
            // console.log(to_user + " to user");
        // let friends = req.user
        // .populate({
        //     path:"friendship",
        //     populate:{
        //         path:"from_user"
        //     }
        // })
        // .populate({
        //     path:"friendship",
        //     populate:{
        //         path:"to_user"
        //     }
        // });
        //u can try
        let friends;
        if(req.user){
            friends = await User.findById(req.user._id)
             .populate({
                     path : "friendship",
                     populate : {
                        path : "from_user",
                    }
                 })
                 .populate({
                    path : "friendship",
                    populate : {
                       path : "to_user"
                   }
                });
            
            
        }
        // console.log(user);
        ///how to find from array
        return res.render("home",{
            title: "This is my Title.",
            posts:posts,
            all_users:users,
            friends:friends
        });
    }catch(err){
        console.log(err);
        return;
    }
}
