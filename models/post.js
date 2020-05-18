const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    //to get the array of comments
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{
    timestamps:true
}

);
const Post = mongoose.model("Post",postSchema);

module.exports = Post;