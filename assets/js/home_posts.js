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
                },
                error:function(err){
                    console.log(err.responseText);
                }

            });
        });
    }
    let newPostDom = function(post){
        return $(`<li id="post-${post.id}">
                <a href="/post/delete/${post.id}">
                    X
                </a>
                ${post.content} By ${post.user.name}
                <div class="post-comment-list">
                </div>
                    <div class="post-comment">
                        <!-- form for comment -->
                        <form method="POST" action="/comment/create">
                                <input type="text" placeholder="Enter your comment" name="content" required>
                                <input type="hidden" name="postid" value="<%=post._id%>" required >
                                <input type="submit" value="Add Comment">
                        </form>
                    </div>
        
                </li>
        `);
    }
    createPost();
}