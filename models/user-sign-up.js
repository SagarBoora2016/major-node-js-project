const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        uniqued:true
    },
    password:{
        type:String,
        require:true,
        uniqued:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
);

const user = mongoose.model("User",userSchema);
module.exports = user;