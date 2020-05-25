{
    //method to submit the form data for new post
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type:"post",
                url:"/post/create",
                data: newPostForm.serialize(),
                success:function(data){
                    console.log(data);
                },
                error:function(err){
                    console.log(err.responseText);
                }
                
            });
        });
    }
    createPost();
}