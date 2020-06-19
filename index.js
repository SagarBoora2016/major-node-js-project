const express = require("express");
const app = express();
const port = 8000;

const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');

const passsportGoogle = require("./config/passport-google-oauth");

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("char server is listeing on port 5000");

const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");

const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

app.use(express.urlencoded());;
app.use(cookieParser());
app.use(expressLayouts);
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

const sassMiddleware = require("node-sass-middleware");
app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:false,
    outputStyle:"extended",
    prefix:"/css"
}));
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
app.use(flash());
app.use(customMiddleware.setFlash);

app.use("/",require("./routes/index"));
app.listen(port,function(err){
    if(err){
        console.log("eerr");
        return;
    }
    console.log(`Running on port ${port}`);
});