{
    let likePost = function(){
        let newLike = $("#posts-list-contianer .like-post");
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
    }
    let likeComment = function(){
        let newLike = $("#post-comment-list .like-comment");
        newLike.click(function(event){
            event.preventDefault();
            let ele = $(this);
            $.ajax({
                method:"POST",
                url:"/like/toggle/?id="+ele.attr("id").split("-")[1] +"&type=Comment",
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
    }
    likePost();
    likeComment();
}