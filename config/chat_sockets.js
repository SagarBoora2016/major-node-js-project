module.exports.chatSockets= function(socketServer){
    let io = require("socket.io")(socketServer);
    io.sockets.on("connection",function(socket){
        console.log("new connection ", socket.id);
    });
    io.sockets.on("disconnect",function(){
        console.log("Socket Disconnected.");
    });
};