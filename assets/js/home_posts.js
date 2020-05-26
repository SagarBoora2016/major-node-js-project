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
                    let newPost = newPostDom(data.data.post);
                    console.log(newPost);
                    $("#posts-list-contianer>ul").append(newPost);
                    deletePost(" .delete-post-button",newPost);
                    console.log("post created");
                },
                error:function(err){
                    console.log(err.responseText);
                }

            });
        });
    }
    let newPostDom = function(post){
        console.log(post);
        return $(`<li id="post-${post._id}">
                <a class="delete-post-button" href="/post/delete/${post._id}">
                    X
                </a>
                ${post.content} By ${post.user.name}
                <div class="post-comment-list">
                </div>
                    <div class="post-comment">
                        <!-- form for comment -->
                        <form method="POST" action="/comment/create">
                                <input type="text" placeholder="Enter your comment" name="content" required>
                                <input type="hidden" name="postid" value="${post._id} required >
                                <input type="submit" value="Add Comment">
                        </form>
                    </div>
        
                </li>
        `);
    }
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            console.log("Prevented default");
            e.preventDefault();
            $.ajax({
                type:"get",
                url:$(deleteLink).prop("href"),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    console.log("removed");
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        });
    }
    createPost();
}