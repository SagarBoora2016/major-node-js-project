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
                    deletePost(" .delete-post-button",newPost);
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
                <h2>Comments</h2>
                    <%- include("_comment") -%>
                
                    <div class="post-comment">
                        <form method="POST" action="/comment/create">
                                <input type="text" placeholder="Enter your comment" name="content" required>
                                <input type="hidden" name="postid" value="${post._id}" required >
                                <input type="submit" value="Add Comment">
                        </form>
                    </div>
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
                }
            })
        });
    }
    let createComment = function(postID){
        let newCommentForm = $(`#new-comment-form-${postID}`);
        newCommentForm.submit(function(e){
            console.log("here");
            e.preventDefault();
            console.log(newCommentForm.serialize());
            
            $.ajax({
                type:"post",
                url:"/comment/create",
                data:newCommentForm.serialize(),
                success:function(data){
                    console.log(data.data.comment.post);
                    let newComment = newCommentDom(data);
                    $(`#post-comment-${data.data.post._id}`).append(newComment);
                    console.log("done");

                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    let newCommentDom = function(comment){
        console.log(comment.data.comment.content);
        return $(`
            <li>
                <a class="delete-comment-button" href="/comment/delete/${comment.data.comment._id}">
                    X
                </a>
                <p>
                    ${comment.data.comment.content} by
                </p>
                <small>
                    ${comment.data.comment.user}
                </small>
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
    posttoajax()
    createPost();
}