const express = require("express");
const app = express();
const port = 8000;

const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');

const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

app.use(express.urlencoded());;
app.use(cookieParser());
app.use(expressLayouts);
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

app.use(express.static("./assets"));
// console.log(expressLayouts + "used");
app.set("view engine","ejs");
app.set("views","./views");
const MongoStore = require('connect-mongo')(session);

app.use(session({
    name:"sociel",
    secret:"bbkivines",
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({ 
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function(err){
            console.log(err || "Error connecting in momgo");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);

app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log("eerr");
        return;
    }
    console.log(`Running on port ${port}`);
});