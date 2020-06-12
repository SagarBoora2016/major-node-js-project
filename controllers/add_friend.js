const FriendShip = require("../models/friendship");

module.exports.addFriend =async function(req,res){
    let from_user = req.user._id;
    let to_user = req.params.id;
    let exist = await FriendShip.findOne({
        from_user:req.user.id,
        to_user:req.params.id
    });
    // console.log(req.user);
    if(exist){
        exist.remove();
    }else{
        await FriendShip.create({
            from_user:req.user._id,
            to_user:req.params.id
        });
    }
    // console.log(exist);
    return res.redirect("back");
}; 