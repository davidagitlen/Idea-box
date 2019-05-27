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
starredIdeasBtn.addEventListener('click', showStarredIdeas)
saveBtn.addEventListener('click', handleSubmit);
titleInput.addEventListener('keyup', enableSaveBtn);
bodyInput.addEventListener('keyup', enableSaveBtn);
searchInput.addEventListener('keyup', searchFilter);
outputField.addEventListener('keydown', handleCardEdit);
outputField.addEventListener('focusout', focusOutEvent);
outputField.addEventListener('click', handleCardButtons);

function handleCardButtons(e) {
 if (e.target.classList.contains('delete-button')) {
   deleteCard(e);
 };
 if (e.target.classList.contains('star-button')) {
 	toggleStar(e);
 };
 if (e.target.classList.contains('upvote-button')) {
	toggleUpvote(e);
 };
 if (e.target.classList.contains('downvote-button')) {
	toggleDownvote(e);
 }
};

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
	var idea = new Idea(titleInput.value, bodyInput.value, Date.now(), false, 0);
	ideaArray.push(idea);
	idea.storeIdea(ideaArray);
	titleInput.value = "";
	bodyInput.value = "";
	displayIdeaCard(idea);
	disableSaveBtn();
};


function displayIdeaCard({title, body, data, star, quality, qualityRating}) {
	var starSrc = star ? 'star-active.svg' : 'star.svg';
	outputField.insertAdjacentHTML('afterbegin', 	
		`<section class="idea-box" data-id=${data}>
			<header class="idea-header">
				<input type="image" class="star-button" src="idea-box-icons/${starSrc}">
				<input type="image" src="idea-box-icons/delete.svg" class="delete-button">
			</header>
			<article class="idea-article">
				<p class="idea-article-title" id="idea-title" contenteditable="true">${title}<p>
				<p class="idea-article-body" id="idea-body" contenteditable="true">${body}</p>
			</article>
			<footer class="idea-footer">
				<input type="image" class="upvote-button" src="idea-box-icons/upvote.svg">
				<p class= "quality-text">Quality:&nbsp;&nbsp;${qualityRating[quality]}</p>
				<input type="image" class="downvote-button" src="idea-box-icons/downvote.svg">
			</footer>
		</section>`)
};

function repopulateIdeaCards() {
	for (var i = 0; i < ideaArray.length; i++) {
		displayIdeaCard(ideaArray[i]);
	}
};

function handleCardEdit(e) {
  if (e.keyCode === 13) {
  	var title = e.target.closest('.idea-article').querySelector('#idea-title').innerText;
  	var body = e.target.closest('.idea-article').querySelector('#idea-body').innerText;
    e.target.blur();
    var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
    var ideaToUpdate = findIdea(ideaId);
    ideaToUpdate.updateIdea(title, body);
    ideaToUpdate.storeIdea(ideaArray);
  }
};

function focusOutEvent(e) {
	 	var title = e.target.closest('.idea-article').querySelector('#idea-title').innerText;
  	var body = e.target.closest('.idea-article').querySelector('#idea-body').innerText;
    var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
    var ideaToUpdate = findIdea(ideaId);
    ideaToUpdate.updateIdea(title, body);
    ideaToUpdate.storeIdea(ideaArray);
}

function enableSaveBtn() {
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

function toggleStar(e) {
	var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
	var targetIdea = findIdea(ideaId);
	targetIdea.updateStar();
	if(targetIdea.star) {
		e.target.setAttribute('src', 'idea-box-icons/star-active.svg');
	} else {
		e.target.setAttribute('src', 'idea-box-icons/star.svg');
	}
	targetIdea.storeIdea(ideaArray);
};

function toggleUpvote(e) {
	var qualityText = e.target.closest('.idea-footer').querySelector('.quality-text');
	var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
	var targetIdea = findIdea(ideaId);
	targetIdea.updateQuality('upvote');
	if (targetIdea.quality === 0) {
	qualityText.innerText =	"Quality:  " + targetIdea.qualityRating
	} if (targetIdea.quality === 1) {
	qualityText.innerText = "Quality:  " + targetIdea.qualityRating
	} if (targetIdea.quality === 2) {
	qualityText.innerText = "Quality:  " + targetIdea.qualityRating
	}
	targetIdea.storeIdea(ideaArray);
}

function toggleDownvote(e) {
	var qualityText = e.target.closest('.idea-footer').querySelector('.quality-text');
	var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
	var targetIdea = findIdea(ideaId);
	targetIdea.updateQuality('downvote');
	if (targetIdea.quality === 0) {
	qualityText.innerText =	"Quality:  " + targetIdea.qualityRating
	} if (targetIdea.quality === 1) {
	qualityText.innerText = "Quality:  " + targetIdea.qualityRating
	} if (targetIdea.quality === 2) {
	qualityText.innerText = "Quality:  " + targetIdea.qualityRating
	}
	targetIdea.storeIdea(ideaArray);
}

function findIdea(id) {
	return ideaArray.find(function(idea) {
		return idea.data == id;
	})
};

function searchFilter() {
  if(starredIdeasBtn.innerHTML === 'View All Ideas') {
    searchStarFilter();
  } else {
    outputField.innerHTML = '';
    var searchText = document.querySelector('#search-ideas-input').value.toLowerCase();
    var filteredIdeas = ideaArray.filter(function(idea) {
      return (idea.title.toLowerCase().includes(searchText) || idea.body.toLowerCase().includes(searchText)) 
    });
    filteredIdeas.forEach(function(idea) {
      displayIdeaCard(idea);
    })
  }
};

function searchStarFilter() {
  outputField.innerHTML = '';
  var searchText = document.querySelector('#search-ideas-input').value.toLowerCase();
  var filteredIdeas = ideaArray.filter(function(idea) {
    return (idea.title.toLowerCase().includes(searchText) && idea.star === true || idea.body.toLowerCase().includes(searchText) && idea.star === true) 
  });
  filteredIdeas.forEach(function(idea) {
    displayIdeaCard(idea);
  })
}

function showStarredIdeas() {
  if (starredIdeasBtn.innerHTML === 'Show Starred Ideas') {
    outputField.innerHTML = '';
    var filteredStarIdeas = ideaArray.filter(function(idea) {
      return idea.star === true;
    }); 
    filteredStarIdeas.forEach(function(idea) {
      displayIdeaCard(idea);
    })
    starredIdeasBtn.innerHTML = 'View All Ideas';
  } else {
    outputField.innerHTML = '';
    repopulateIdeaCards();   
    starredIdeasBtn.innerHTML = 'Show Starred Ideas'
  }
};