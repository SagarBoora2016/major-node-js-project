module.exports.chatSockets= function(socketServer){
    let io = require("socket.io")(socketServer);
    io.sockets.on("connection",function(socket){
        // console.log("new connection ", socket.id);
        socket.on("disconnect",function(){
            console.log("Socket Disconnected.");
        });
        socket.on("join_room",function(data){
            // console.log("Joining Request ",data);
            socket.join(data.chat_room);
            io.in(data.chat_room).emit("user_joined",data);
        });
        socket.on("send_message",function(data){
            // console.log("inside send msg ",data);
            io.in(data.chat_room).emit("receive_message",data);
        });
    });
}