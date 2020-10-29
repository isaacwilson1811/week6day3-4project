//
var postID = 0;
let html_postList = $('#commentPostList');
let button_submitComment = $('#submitComment');
let postArray = [];

function findMyIndex(obj,id){
	return obj.order === id;
}

// Constructor Function for Post object.
function Post(name,comment,order){
    this.name = name;
    this.comment = comment;
    this.order = order;
}

//Function making a post content block using string template for each comment post
function writePost(name,comment,id){
	let ts = new Date();
	let tsDate = ts.toDateString();
	let tsTime = ts.toLocaleTimeString();
	let timeStamp = "Posted @ " + tsTime + " On " + tsDate;
	
    let myPost =
`<div id="${id}" class="commentPost">
    <div class="leftCol">
    </div>
    <div class="rightCol">
        <div class="row1">
            <section>
                <p>${name}</p><p>${timeStamp}</p>
            </section>
            <section>
                <button type="button" id="${id}" class="editBtn">Edit</button>
                <button type="button" id="${id}" class="deleteBtn">Delete</button>
            </section>
        </div>
        <div class="row2">
            <section>
                <p id="commentP">${comment}</p>
            </section>
        </div>
        <div class="row3">
            <input type="text" id="commentEdit" value="">
            <button type="button" id="submitCommentEdit">Submit</button>
        </div>
    </div>
</div>`;
return myPost;
}

//the function to build up all the posts into the html
function updatePosts(){
    //let i = postArray.length;
	// for each post, make a string of html for that post
    let myHTML = "";
    postArray.forEach(function(obj){
        let name = obj.name;
        let comment = obj.comment;
		let id = obj.order;
        myHTML += writePost(name,comment,id);
    });
	// put all the strings into the html
    $(html_postList).html(myHTML);
	$('.row3').hide();
	
	//attach event handlers to buttons
	
	//delete comment
	$('#commentPostList').on('click', '.deleteBtn', function(){	
		let myPostID = $(this).attr("id");
		let myIndex = postArray.findIndex(function(obj){
			return obj.order === Number(myPostID);
		});
		delete postArray[myIndex];
		
		let myPostBlock = $(this).parentsUntil('#commentPostList');
		$(myPostBlock).remove();
	});
	//edit comment shows the .row3 class
	$('#commentPostList').on('click', '.editBtn', function(){		
		let row3 = $(this).parentsUntil('.rightCol').next().next();
		$(row3).show();

	});

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
        let order = postID;
        postArray.unshift(new Post(name,comment,order));
		postID++;
        updatePosts();
    }
});

















