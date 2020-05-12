module.exports.profile = function(req,res){
    // res.end("<h1>USer PRofile</h1>");
    console.log("Users profile");
    return res.render("user-profile",{
        title:"My title"
    });
}
module.exports.signUp = function(req,res){
    return res.render("user-sign-up",{
        title:"My sign up  page"
    });
}
module.exports.signIn = function(req,res){
    return res.render("user-sign-in",{
        title:"Sign In Page"
    });
}
module.exports.createSession =function(req,res){
    //To Do
}
module.exports.create = function(req,res){
    //TO Do
}