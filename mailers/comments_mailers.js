const nodeMailer = require("../config/node-mailer");
exports.newComment=(comment)=>{
    console.log("Inside mailer");
    nodeMailer.transporter.sendMail({
        from:"sagarboora.2020@gmail.com",
        to:comment.user.email,
        subject:"New comment Published",
        html:"<h1>Yup, Your comment is published.</h1>"
    },(err,info) =>{
        if(err){
            console.log("error");
            return;
        }
        console.log("mail delivered ",info);
        return;
    }
    
    
    )
}