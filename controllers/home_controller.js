module.exports.home= function(re1,res){
    console.log("home");
    return res.render("home",{
        title: "This is my Title."
    });
}
