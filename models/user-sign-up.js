const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    friendship:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Friendship"
        }
    ]
    //this is crct na
},{
    timestamps:true
}
);

const User = mongoose.model("User",userSchema);
module.exports = User;