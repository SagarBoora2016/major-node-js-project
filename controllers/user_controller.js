module.exports.profile = function(req,res){
    // res.end("<h1>USer PRofile</h1>");
    console.log("Users profile");
    return res.render("user-profile",{
        title:"My title"
    });
}
