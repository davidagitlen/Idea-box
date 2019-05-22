var ideaArray = [];
var starredIdeasBtn = document.getElementById('starred-ideas-button');
var newQualityInput = document.getElementById('quality-input');
var addQualityBtn = document.getElementById('add-quality-button');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveBtn = document.getElementById('save-button');
var searchInput = document.getElementById('search-ideas-input');
var outputField = document.getElementById('output-field');

saveBtn.addEventListener('click', handleSubmit);
titleInput.addEventListener('keyup', enableSaveBtn);
bodyInput.addEventListener('keyup', enableSaveBtn);


function handleSubmit() {
	createIdea();
};

function createIdea() {
	var idea = new Idea(titleInput.value, bodyInput.value);
	console.log(titleInput.value);
	ideaArray.push(idea);
	console.log(ideaArray);
	idea.storeIdea(ideaArray);
	titleInput.value = "";
	bodyInput.value = "";
	displayIdeaCard(idea);
	disableSaveBtn();
};

function displayIdeaCard({title, body}) {
	console.log('hello!')
	outputField.insertAdjacentHTML('afterbegin', 	`<section class="idea-box">
			<header class="idea-header"><input type="image" src="idea-box-icons/star.svg" height="30px" width="30px"><input type="image" src="idea-box-icons/delete.svg" class="delete-button" height="30px" width="30px"></header>
			<article class="idea-article">
				<p>${title}<p>
				<p>${body}</p>
			</article>
			<footer class="idea-footer"><input type="image" src="idea-box-icons/upvote.svg" height="30px" width="30px"><p class= "idea-footer-text">Quality:&nbsp;&nbsp;<span>Swill</span></p><input type="image" src="idea-box-icons/downvote.svg" height="30px" width="30px"></footer>
		</section>`)
};

function enableSaveBtn() {
	console.log('I\'m working');
	if (titleInput.value !== "" || bodyInput.value !== "") {
		saveBtn.disabled = false;
	}
};

function disableSaveBtn() {
	saveBtn.disabled = true;
};

outputField.addEventListener('click', function(e) {
 if (e.target.classList.contains('delete-button')) {
   deleteCard(e);
 };
});

function deleteCard(e) {
 e.target.closest('.idea-box').remove();
};