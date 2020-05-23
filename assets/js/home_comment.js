{
    // Method to submit the form data for new comment using AJAX
    let createComment = function(){
        let newCommentForms = $('.new-comment-form');
        // console.log(newCommentForms);
        
        newCommentForms.submit(function(e){
            let curForm = $(this);
            // console.log(newPostForm.serialize());
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create-comments',
                data: $(this).serialize(),
                success: function(data){
                    console.log(data.data.comment.post);
                    let newComment = newCommentDom(data.data.comment);
                    // console.log(newComment );
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    // console.log($(`post-comments-${ post._id }`));
                    deleteComment($(' .delete-comment-button', newComment));
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }
    //Create a post in DOM
    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment._id }">
        <small>
          <a href="comments/destroy-comments/${ comment._id }" class = "delete-comment-button">X</a>            
        </small>        
        ${ comment.content }
        <br>
        <small>
            ${ comment.user.name }
        </small>
        </li>`);
    }
    // method to delete the comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data.data.comment._id);
                    $(`#comment-${data.data.comment._id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }
    let convertCommentsToAjax = function(){
        // console.log($('.post-comments-list>ul>li'));

        $('.post-comments-list>ul>li').each(function(){
            let self = $(this);
            // console.log()
            // console.log($('#posts-list-container>ul>li'));
            let deleteButton = $(' .delete-comment-button');

            // console.log(deleteButton);
            deleteComment(deleteButton);

            // get the post's id by splitting the id attribute
            // let postId = self.prop('id').split("-")[1]
            // new PostComments(postId);
        });
    }

    
    createComment();
    convertCommentsToAjax();
}