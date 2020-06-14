{
    console.log("like");
    let addOrRemove= function(){
        $("#addorremove").click(function(event){
            event.preventDefault();
            $("#addorremove").children("i").remove();
            $("#addorremove").children("span").remove();
            $.ajax({
                url:$("#addorremove").attr("href"),
                method:"Post",
                success:function(data){
                    if(data.data){
                        $("#addorremove").append(`<span>Add as friend</span><i class="fas fa-user-plus"></i>`);
                    }else{
                        $("#addorremove").append(`<span>Remove as friend</span><i class="fas fa-user-times"></i>`);
                    }
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
            
            
        });
    }
    addOrRemove();
}