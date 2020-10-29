//
var postID = 0;
let html_postList = $('#commentPostList');
let button_submitComment = $('#submitComment');
let postArray = [{}];

// Constructor Function for Post object.
function Post(name,comment,order){
    this.name = name;
    this.comment = comment;
    this.order = order;
}

//Function making a post content block using string template for each comment post
function writePost(name,comment,order){
	let ts = new Date();
	let tsDate = ts.toDateString();
	let tsTime = ts.toLocaleTimeString();
	let timeStamp = "Posted @ " + tsTime + " On " + tsDate;
	let delBtnID = order.toString()+"del";
	let editBtnID = order.toString()+"edit";
	let submitBtnID = order.toString()+"submit";
    let myPost =
`<div id="${order}" class="commentPost">
    <div class="leftCol">
    </div>
    <div class="rightCol">
        <div class="row1">
            <section>
                <p>${name}</p><!--<p>${timeStamp}</p>-->
            </section>
            <section>
                <button type="button" id="${editBtnID}" class="editBtn">Edit</button>
                <button type="button" id="${delBtnID}" class="deleteBtn">Delete</button>
            </section>
        </div>
        <div class="row2">
            <section>
                <p id="commentP">${comment}</p>
            </section>
        </div>
        <div class="row3">
            <input type="text" id="commentEdit" value="${comment}">
            <button type="button" id="${submitBtnID}">Submit</button>
        </div>
    </div>
</div>`;
return myPost;
}

//the function to build up all the posts into the html
function updatePosts(){
	$('#commentPostList').off('click');
	$(html_postList).html("");
	// for each post, append the html
    postArray.forEach(function(obj){
        let name = obj.name;
        let comment = obj.comment;
		let id = obj.order;
		$(html_postList).append(writePost(name,comment,id));
		$(`#${id} .row3`).hide();
		//attach event handlers to buttons
		
		//delete comment
		let delBtnID = "#"+id.toString()+"del";
		$('#commentPostList').on('click', delBtnID, function(){	
			let myPostBlock = $(this).parentsUntil('#commentPostList');
			$(myPostBlock).remove();
			let myPostID = id;
			let myIndex = postArray.findIndex(function(obj){
				return obj.order === Number(myPostID);
			});
			postArray.splice(myIndex,1);
			//delete postArray[myIndex];
			updatePosts();
		});
		
		//edit comment shows the .row3 class
		let editBtnID = "#"+id.toString()+"edit";
		$('#commentPostList').on('click', editBtnID, function(){		
			let row3 = $(this).parentsUntil('.rightCol').next().next();
			$(row3).toggle();

		});
		
		//submit edited comment button
		let submitBtnID = "#"+id.toString()+"submit";
		$('#commentPostList').on('click', submitBtnID, function(){
			let myPostID = id;			
			let myComment = $(this).prev().val();
			console.log(myComment);
			let myIndex = postArray.findIndex(function(obj){
				return obj.order === Number(myPostID);
			});
			postArray[myIndex].comment = myComment;
			updatePosts();

		});
		
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
		$(html_postList).html("");
        updatePosts();
    }
});