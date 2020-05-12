const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");

app.use(express.urlencoded());;
app.use(cookieParser());
app.use(expressLayouts);
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

app.use(express.static("./assets"));
// console.log(expressLayouts + "used");
app.set("view engine","ejs");
app.set("views","./views");
app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log("eerr");
        return;
    }
    console.log(`Running on port ${port}`);
});