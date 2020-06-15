{
    let addOrRemove= function(){
        $("#user-friends .friends-list p a").click(function(event){
            event.preventDefault();
            
            console.log(this);
            this.remove();
            $.ajax({
                url:this.getAttribute("href"),
                method:"Post",
                success:function(data){
                   
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
            
            
        });
    }
    addOrRemove();
}