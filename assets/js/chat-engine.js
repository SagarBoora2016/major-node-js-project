

class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.charBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect("http://localhost:5000");

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on("connect",function(){
            // console.log("connection established");
            self.socket.emit("join_room",{
                user_email:self.userEmail,
                chat_room:"Codeial"
            });
        });
        self.socket.on("user_joined",function(data){
            console.log("user joined",data);
        });
        $("#new-message-btn").click(function(){
            console.log("clicked");
            let msg = $("#new-message-ip").val();
            console.log(msg);
            if(msg!=""){
                self.socket.emit("send_message",{
                    user_email:self.userEmail,
                    message:msg,
                    chat_room:"Codeial"
                });
            }
        });
        self.socket.on("receive_message",function(data){
            // console.log("message Received ",data);
            let newMessage = $("<li>");
            let msgType="other-msg";
            if(data.user_email==self.userEmail){
                msgType="self-msg"
            }
            newMessage.append($("<span>",{
                "html":data.message
            }));
            newMessage.append("<sub>",{
                "html":data.user_email
            });
            newMessage.addClass(msgType);
            $("#chat-list").append(newMessage);
        });
    }
}