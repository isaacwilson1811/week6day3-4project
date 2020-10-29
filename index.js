let html_postList = $('#commentPostList');
let button_submitComment = $('#submitComment');
let postArray = [];

// Constructor Function for Post object.
function Post(name,comment,order){
    this.name = name;
    this.comment = comment;
    this.order = order;
}

//The string template for the post block
function writePost(name,comment){
    let time = Math.floor(Date.now() / 1000);
    let myPost =
`<div class="commentPost">
    <div class="leftCol">
    image
    </div>
    <div class="rightCol">
        <div class="row1">
            <section>
                <p>${name} @ ${time}</p>
            </section>
            <section>
                <button type="button" id="edit">Edit</button>
                <button type="button" id="delete">Delete</button>
            </section>
        </div>
        <div class="row2">
            <section>
                <p id="commentP">${comment}</p>
            </section>
        </div>
        <div class="hidden">
            <input type="text" id="commentEdit" value="">
            <button type="button" id="submitCommentEdit">Submit</button>
        </div>
    </div>
</div>`;
return myPost;
}

function updatePosts(){
    let i = postArray.length;
    let myHTML = "";
    postArray.forEach(function(obj){
        let name = obj.name;
        let comment = obj.comment;
        myHTML += writePost(name,comment);
    });
    $(html_postList).html(myHTML);
};

//When The Submit Comment Button Is Clicked Call The Function
$(button_submitComment).on('click',function(){
    let name = $('#userName').val();
    let comment = $('#comment').val();
    if (name.length === 0){
        alert('A display name is required');
    } else if (comment.length === 0){
        alert('A comment is required');
    } else {
        let order = postArray.length;
        postArray.unshift(new Post(name,comment,order));
        updatePosts();
    }
});