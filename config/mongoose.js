const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sociel_development");
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connecting to Mongodb'));

db.once("open",function(){
    console.log("Connected to MongoDb Successfully");
});
module.exports = db;