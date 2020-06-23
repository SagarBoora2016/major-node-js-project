const mongoose = require("mongoose");
const env = require("../config/environment");
mongoose.connect(`mongodb://localhost/${env.db}`);
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connecting to Mongodb'));

db.once("open",function(){
    console.log("Connected to MongoDb Successfully");
});
module.exports = db;