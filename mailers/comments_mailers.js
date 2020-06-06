const nodeMailer = require("../config/node-mailer");
exports.newComment=(comment)=>{
    let htmlString = nodeMailer.renderTemplete({comment:comment},"/comment/newcomment.ejs");
    nodeMailer.transporter.sendMail({
        from:"sagarboora.2020@gmail.com",
        to:comment.user.email,
        subject:"New comment Published",
        html:htmlString
    },(err,info) =>{
        if(err){
            console.log("error");
            return;
        }
        // console.log("mail delivered ",info);
        return;
    }
    
    
    )
}