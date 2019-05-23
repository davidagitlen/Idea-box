var ideaArray = [];
var starredIdeasBtn = document.getElementById('starred-ideas-button');
var newQualityInput = document.getElementById('quality-input');
var addQualityBtn = document.getElementById('add-quality-button');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveBtn = document.getElementById('save-button');
var searchInput = document.getElementById('search-ideas-input');
var outputField = document.getElementById('output-field');

window.addEventListener('load', refillArray);
window.addEventListener('load', repopulateIdeaCards);
saveBtn.addEventListener('click', handleSubmit);
titleInput.addEventListener('keyup', enableSaveBtn);
bodyInput.addEventListener('keyup', enableSaveBtn);
outputField.addEventListener('click', function(e) {
 if (e.target.classList.contains('delete-button')) {
   deleteCard(e);
 };
});

function handleSubmit() {
	createIdea();
};

function refillArray() {
	if (JSON.parse(localStorage.getItem('ideaArray')) === null){
		return;
	} else {
	var newArray = JSON.parse(localStorage.getItem('ideaArray')).map(function(array) {
		return new Idea(array.title, array.body, array.data, array.star, array.quality);
	});
	ideaArray = newArray;}
};

function createIdea() {
	var idea = new Idea(titleInput.value, bodyInput.value, Date.now());
	ideaArray.push(idea);
	idea.storeIdea(ideaArray);
	titleInput.value = "";
	bodyInput.value = "";
	displayIdeaCard(idea);
	disableSaveBtn();
};

function displayIdeaCard({title, body, data}) {
	outputField.insertAdjacentHTML('afterbegin', 	`<section class="idea-box" data-id=${data}>
			<header class="idea-header"><input type="image" src="idea-box-icons/star.svg" height="30px" width="30px"><input type="image" src="idea-box-icons/delete.svg" class="delete-button" height="30px" width="30px"></header>
			<article class="idea-article">
				<p>${title}<p>
				<p>${body}</p>
			</article>
			<footer class="idea-footer"><input type="image" src="idea-box-icons/upvote.svg" height="30px" width="30px"><p class= "idea-footer-text">Quality:&nbsp;&nbsp;<span>Swill</span></p><input type="image" src="idea-box-icons/downvote.svg" height="30px" width="30px"></footer>
		</section>`)
};

function repopulateIdeaCards() {
	for (var i = 0; i < ideaArray.length; i++) {
	outputField.insertAdjacentHTML('afterbegin', 	`<section class="idea-box" data-id=${ideaArray[i].data}>
			<header class="idea-header"><input type="image" src="idea-box-icons/star.svg" height="30px" width="30px"><input type="image" src="idea-box-icons/delete.svg" class="delete-button" height="30px" width="30px"></header>
			<article class="idea-article">
				<p>${ideaArray[i].title}<p>
				<p>${ideaArray[i].body}</p>
			</article>
			<footer class="idea-footer"><input type="image" src="idea-box-icons/upvote.svg" height="30px" width="30px"><p class= "idea-footer-text">Quality:&nbsp;&nbsp;<span>Swill</span></p><input type="image" src="idea-box-icons/downvote.svg" height="30px" width="30px"></footer>
		</section>`)
	}
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

function deleteCard(e) {
e.target.closest('.idea-box').remove();
var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
var idea = new Idea;
idea.removeIdea(ideaId);
};