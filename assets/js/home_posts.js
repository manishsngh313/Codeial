{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            // console.log(newPostForm.serialize());
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    console.log(newPost);
                    $('#posts-list-container>ul').prepend(newPost);
                    // deletePost($(' .delete-post-button', newPost));
                    deletePost($(' .delete-post-button', newPost));
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }
    //Create a post in DOM
    let newPostDom = function(post){
        return $(`
        <li id="post-${ post._id }">
            <p>
                <small>
                    <a class="delete-post-button" href="/posts/delete/${ post._id }">X</a>
                </small>
                    
                ${ post.content }
                <br>
                <small>
                    ${ post.user.name }
                </small>
               
               
            </p>
            <div id = 'comment-feed'>      
                <form action="/comments/create-comments"  method="POST">
                    <input type="text" name="content" placeholder="Type here to start comment...">
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="comment">
                </form>
                    
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id }">
                                          </ul>
                </div>
            </div>
        
        </li>
               `);
    }
    // method to delete the post from DOM
    // let deletePost = function(deleteLink){
    //     $(deleteLink).click(function(e){
    //         e.preventDefault();

    //         $.ajax({
    //             type: 'get',
    //             url: $(deleteLink).prop('href'),
    //             success: function(data){
    //                 $(`post-${data.data.post_id}`).remove();
    //                 console.log(deleteLink);
    //             }, error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         });
    //     });

    // }
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data.data.post._id);
                    $(`#post-${data.data.post._id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    let convertPostsToAjax = function(){
        // console.log($('#posts-list-container>ul>li'));

        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            // console.log($('#posts-list-container>ul>li'));
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            // new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}