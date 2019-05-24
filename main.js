var ideaArray = [];
var starredIdeasBtn = document.getElementById('starred-ideas-button');
var newQualityInput = document.getElementById('quality-input');
var addQualityBtn = document.getElementById('add-quality-button');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveBtn = document.getElementById('save-button');
var searchInput = document.getElementById('search-ideas-input');
var outputField = document.getElementById('output-field');
var ideaCard = document.querySelector('.idea-box'); 

window.addEventListener('load', refillArray);
window.addEventListener('load', repopulateIdeaCards);
saveBtn.addEventListener('click', handleSubmit);
titleInput.addEventListener('keyup', enableSaveBtn);
bodyInput.addEventListener('keyup', enableSaveBtn);
outputField.addEventListener('keydown', handleCardEdit)
outputField.addEventListener('click', function(e) {
 if (e.target.classList.contains('delete-button')) {
   deleteCard(e);
 };
 if (e.target.classList.contains('star-button')) {
 	var star = e.target;
 	toggleStar(star);
 	}
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

function displayIdeaCard({title, body, data, star, quality}) {
	var starSrc = star ? 'star-active.svg' : 'star.svg';
	outputField.insertAdjacentHTML('afterbegin', 	`<section class="idea-box" data-id=${data}>
			<header class="idea-header"><input type="image" class="star-button" src="idea-box-icons/${starSrc}" height="30px" width="30px"><input type="image" src="idea-box-icons/delete.svg" class="delete-button" height="30px" width="30px"></header>
			<article class="idea-article">
				<p class="idea-article-title" id="idea-title" contenteditable="true">${title}<p>
				<p class="idea-article-body" id="idea-body" contenteditable="true">${body}</p>
			</article>
			<footer class="idea-footer"><input type="image" src="idea-box-icons/upvote.svg" height="30px" width="30px"><p class= "idea-footer-text">Quality:&nbsp;&nbsp;<span>Swill</span></p><input type="image" src="idea-box-icons/downvote.svg" height="30px" width="30px"></footer>
		</section>`)
};

function repopulateIdeaCards() {
	for (var i = 0; i < ideaArray.length; i++) {
		displayIdeaCard(ideaArray[i]);
	}
}

function handleCardEdit(e) {
	console.log(e.keyCode);
  if (e.keyCode === 13) {
  	var title = e.target.closest('.idea-article').querySelector('#idea-title').innerText;
  	var body = e.target.closest('.idea-article').querySelector('#idea-body').innerText;
    e.target.blur();
    var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
    var ideaToUpdate = findIdea(ideaId);
    ideaToUpdate.updateIdea(title, body);
    ideaToUpdate.storeIdea(ideaArray);
  }
}

function enableSaveBtn() {
	if (titleInput.value !== "" || bodyInput.value !== "") {
		saveBtn.disabled = false;
	}
}

function disableSaveBtn() {
	saveBtn.disabled = true;
}

function deleteCard(e) {
	e.target.closest('.idea-box').remove();
	var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
	var idea = new Idea;
	idea.removeIdea(ideaId);
}

function toggleStar(star) {
	var ideaId = star.closest('.idea-box').getAttribute('data-id');
	var targetIdea = findIdea(ideaId);
	targetIdea.updateStar();
	if(targetIdea.star) {
		star.setAttribute('src', 'idea-box-icons/star-active.svg');
	} else {
		star.setAttribute('src', 'idea-box-icons/star.svg');
	}
	targetIdea.storeIdea(ideaArray);
}

function findIdea(id) {
	return ideaArray.find(function(idea) {
		return idea.data == id;
	});
}