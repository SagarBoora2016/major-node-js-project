const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },
        //to get the user who commented
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        //to see on whixh post it is commented
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    },{
        timestamps:true
    }
);

const Comment = commentSchema.model("Comment",commentSchema);
module.exports = Comment;