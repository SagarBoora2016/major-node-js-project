const FriendShip = require("../models/friendship");
const User = require("../models/user-sign-up");
const mongoose = require("mongoose");
module.exports.addFriend =async function(req,res){
    let from_user = req.user._id;
    let to_user = req.params.id;
    let exist = await FriendShip.findOne({
        from_user:req.user._id,
        to_user:req.params.id
    });
    let u1 =await User.findOne({_id:req.user._id});
    let u2 =await User.findOne({_id:req.params.id});
    //i founded 2 usrs here
    console.log(req.user);
    if(exist){
        console.log("remove");
        console.log(u1);
        console.log(u2);
        // await u1.friendship.findOne({
        //     from_user:req.user.id,
        //     to_user:req.params.id
        // }).remove();
        // await u2.friendship.findOne({
        //     from_user:req.user.id,
        //     to_user:req.params.id
        // }).remove();
        // u1.friendship.pull({
        //     from_user:req.user._id,
        //     to_user:req.params.id
        // });
        u1.friendship.pull(exist);
        u2.friendship.pull(exist);
        exist.remove();
        u1.save();
        u2.save();
        //fiendship se remove kar dia 
        // u2.friendship.pull({
        //     to_user:req.user.id,
        //     from_user:req.params.id
        // });
        return res.json(200,{
            message:"Removes from friendlist",
            data:true
        });
    }else{
        var valid = mongoose.Types.ObjectId.isValid(req.params.id);
        if(valid){
            console.log("valid");
        }else{
            console.log("Invalid");
        }
        let friendShip=await FriendShip.create({
            from_user:req.user._id,
            to_user:req.params.id
        });
        //error coming here
        // console.log(friendShip);
       //shoukld i remove leyt frienship, this one..noo why to remove that, ok np ,
        u1.friendship.push(friendShip);
        u2.friendship.push(friendShip);
        u1.save();
        u2.save();
        //run?
        return res.json(200,{
            message:"Added Friend Successfully",
            data:false
        });
    }
}; 