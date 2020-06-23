const express = require("express");

const router = express.Router();

router.get("/",function(req,res){
    return res.render("forgot-password",{
        title:"Forgot Password"
    });
});

module.exports = router;