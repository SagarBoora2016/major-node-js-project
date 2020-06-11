{
    let like = function(){
        let newLike = $("#posts-list-contianer .like-post");
        // for(like of newLike){
            newLike.click(function(event){
                event.preventDefault();
                let ele = $(this);
                    $.ajax({
                        method:"POST",
                        url:"/like/toggle/?id="+ele.attr("id").split("-")[1] +"&type=Post",
                        success:function(data){
                            ele = ele.children("span");
                            if(data.data.deleted){
                                let num = parseInt(ele[0].innerText);
                                num--;
                                ele[0].innerText=num;
                            }else{
                                let num = parseInt(ele[0].innerText);
                                num++;
                                ele[0].innerText=num;
                            }
                        },
                        error:function(err){
                            console.log(err);
                        }
                    });
            });
        // }
    }
    like();
}