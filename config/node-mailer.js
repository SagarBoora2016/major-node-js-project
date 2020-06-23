const ejs = require("ejs");
const path = require("path");
const nodeMailer = require("nodemailer");
const env = require("../config/environment");

let transporter = nodeMailer.createTransport(env.smtp);
let renderTemplete = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering");
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplete:renderTemplete
};