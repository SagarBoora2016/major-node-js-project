const ejs = require("ejs");
const path = require("path");
const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "sagarboora.2020@gmail.com", // generated ethereal user
        pass: "sagarbooradevil@1S2020" // generated ethereal password
    }
});
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