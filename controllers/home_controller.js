module.exports.home= function(req,res){
    console.log("home");
    console.log(req.cookies);
    res.cookie("user_id","100");
    res.cookie("something","thats rifht 2 times");
    return res.render("home",{
        title: "This is my Title."
    });
}
