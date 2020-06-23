const User = require("../../../models/user-sign-up");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

module.exports.createSession =async function(req, res){
    try{
        // console.log(req.body);
        let user = await User.findOne({email:req.body.email});
        // console.log(user.passowrd);
        // console.log(req.body.passowrd);
        if(!user || user.password != req.body.password){
            console.log("error here");
            return res.json(422,{
                message:"Invalid Username/Password"
            });
        }
        return res.json(200,{
            message:"Sign In Successfull",
            data:{
                token:jwt.sign(user.toJSON(),env.user_api,{expiresIn:"1000000"})
            }
        });
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal Server Error"
        })
    }       
}