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
                    $("#posts-list-contianer>ul").append(newPost);
                    // deletePost(" .delete-post-button",newPost);
                    deletePost(`post-${data.data.post._id} .delete-post-button`);
                    createComment(data.data.post._id);
                    
                    new Noty({
                        theme:'relax',
                        text:"Post Created.",
                        type:"success",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme:'relax',
                        text:"Eror in creating post",
                        type:"error",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                }

            });
        });
    }
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                <a class="delete-post-button" href="/post/delete/${post._id}">
                    X
                </a>
                ${post.content} By ${post.user.name}
                <div class="post-comment">
                    <form method="POST" id="new-comment-form-${post._id}" action="/comment/create">
                            <input type="text" placeholder="Enter your comment" name="content" required>
                            <input type="hidden" name="postid" value="${post._id}" required >
                            <input type="submit" value="Add Comment">
                    </form>
                </div>
                <div class="post-comment-list">
                    <h2>Comments</h2>
                        <ul id="post-comment-${post._id}">
                        </ul>
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
                    new Noty({
                        theme:'relax',
                        text:"Post Deleted",
                        type:"success",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme:'relax',
                        text:"Error in deleting Post.",
                        type:"error",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                }
            })
        });
    }
    let createComment = function(postID){
        let newCommentForm = $(`#new-comment-form-${postID}`);
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:"post",
                url:"/comment/create",
                data:newCommentForm.serialize(),
                success:function(data){
                    let newComment = newCommentDom(data);
                    $(`#post-comment-${data.data.post._id}`).append(newComment);
                    deleteComment(`#comment-${data.data.comment._id} .delete-comment-button`);
                    new Noty({
                        theme:'relax',
                        text:"Comment Created.",
                        type:"success",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme:'relax',
                        text:"Error in creating comment",
                        type:"error",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                }
            });
        });
    }
    let newCommentDom = function(comment){
        return $(`
            <li id="comment-${comment.data.comment._id}">
                <a class="delete-comment-button" href="/comment/delete/${comment.data.comment._id} ">
                    X
                </a>
                <p>
                    ${comment.data.comment.content} by
                    <small>
                        ${comment.data.comment.user.name}
                    </small>
                </p>
                
            </li>
        `);
    }
    let posttoajax=function()
    {
        $(`#posts-list-contianer>ul>li`).each(function(){
            let self=$(this);
            let id=self.prop("id").split("-")[1];
            let deletePostButton=$(" .delete-post-button",self);
            deletePost(deletePostButton);
            createComment(id);
        });
    }
    let commenttoajax = function(){
        $("#post-comment-list>ul>li").each(function(){
            let self = $(this);
            let id = self.prop("id").split("-")[1];
            let deleteCommentButton = $(" .delete-comment-button",self);
            deleteComment(deleteCommentButton);
        });
    }
    let deleteComment = function(deleteLink){
        console.log(deleteLink);
        
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:"get",
                url:$(deleteLink).prop("href"),
                success:function(data){
                    console.log($(deleteLink).prop("href"));
                    $(`#comment-${data.data.comment}`).remove();
                    new Noty({
                        theme:'relax',
                        text:"Comment Deleted haha .",
                        type:"success",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                },
                error:function(err){
                    console.log(err.responseText);
                    new Noty({
                        theme:'relax',
                        text:"Error in deleting comment.",
                        type:"error",
                        layout:"topRight",
                        timeout:1500
                    }).show();
                }
            });
        });
    }
    posttoajax();
    commenttoajax();
    createPost();
}