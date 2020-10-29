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
	let dID = order.toString()+"d";
	let eID = order.toString()+"e";
    let myPost =
`<div id="${order}" class="commentPost">
    <div class="leftCol">
    </div>
    <div class="rightCol">
        <div class="row1">
            <section>
                <p>${name}</p><p>${timeStamp}</p>
            </section>
            <section>
                <button type="button" id="${eID}" class="editBtn">Edit</button>
                <button type="button" id="${dID}" class="deleteBtn">Delete</button>
            </section>
        </div>
        <div class="row2">
            <section>
                <p id="commentP">${comment}</p>
            </section>
        </div>
        <div class="row3">
            <input type="text" id="commentEdit" value="${comment}">
            <button type="button" id="submitCommentEdit">Submit</button>
        </div>
    </div>
</div>`;
return myPost;
}

//the function to build up all the posts into the html
function updatePosts(){
	$(html_postList).html("");
	// for each post, append the html
    postArray.forEach(function(obj){
        let name = obj.name;
        let comment = obj.comment;
		let id = obj.order;
		$(html_postList).append(writePost(name,comment,id));
		$('.row3').hide();
		//attach event handlers to buttons
		//delete comment
		let idd = "#"+id.toString()+"d";
		$('#commentPostList').on('click', idd, function(){	
			console.log('click');
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
		let ide = "#"+id.toString()+"e";
		$('#commentPostList').on('click', ide, function(){		
			let row3 = $(this).parentsUntil('.rightCol').next().next();
			$(row3).show();

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

















