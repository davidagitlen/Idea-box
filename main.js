var ideaArray = [];
var qualityRating = ['Swill', 'Plausible', 'Genius'];
var starredIdeasBtn = document.getElementById('starred-ideas-button');
var newQualityInput = document.getElementById('quality-input');
var addQualityBtn = document.getElementById('add-quality-button');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveBtn = document.getElementById('save-button');
var searchInput = document.getElementById('search-ideas-input');
var outputField = document.getElementById('output-field');
var ideaCard = document.querySelector('.idea-box'); 
var navToggle = document.querySelector('.Navbar__Link-toggle');
var mainOpacity = document.getElementById('main');
var swillListItem = document.getElementById('swill-li');
var plausibleListItem = document.getElementById('plausible-li');
var geniusListItem = document.getElementById('genius-li');
var tenIdeasBtn = document.getElementById('ten-ideas-button');
var noIdea = document.querySelector('.no-idea-yet-text');
var noStarredIdea = document.querySelector('.no-starred-idea-yet');

window.addEventListener('load', refillArray);
window.addEventListener('load', repopulateIdeaCards);
starredIdeasBtn.addEventListener('click', handleStarButton);
saveBtn.addEventListener('click', createIdea);
titleInput.addEventListener('keyup', handleSaveBtn);
bodyInput.addEventListener('keyup', handleSaveBtn);
searchInput.addEventListener('keyup', handleSearch);
outputField.addEventListener('keydown', handleCardEdit);
outputField.addEventListener('focusout', focusOutEvent);
outputField.addEventListener('click', handleCardButtons);
outputField.addEventListener('focusin', handleHover);
outputField.addEventListener('focusout', handleHoverOut);
navToggle.addEventListener('click', classToggle);
swillListItem.addEventListener('click', handleQualityButtons);
plausibleListItem.addEventListener('click', handleQualityButtons);
geniusListItem.addEventListener('click', handleQualityButtons);
tenIdeasBtn.addEventListener('click', handleShowMoreLess);

function handleCardButtons(e) {
  deleteCard(e);
 	toggleStar(e);
	toggleVote(e, 'upvote', 'upvote-button');
	toggleVote(e, 'downvote', 'downvote-button');
}

function handleQualityButtons(e) {
	searchByQuality(e, 0, 'swill-li');
	searchByQuality(e, 1, 'plausible-li');
	searchByQuality(e, 2, 'genius-li');
}

function handleHover(e) {
  cardButtonHover(e, 'upvote-button', 'upvote-active.svg');
  cardButtonHover(e, 'downvote-button', 'downvote-active.svg');
  cardButtonHover(e, 'delete-button', 'delete-active.svg');
}

function handleHoverOut(e) {
  cardButtonHoverOut(e, 'upvote-button', 'upvote.svg');
  cardButtonHoverOut(e, 'downvote-button', 'downvote.svg');
  cardButtonHoverOut(e, 'delete-button', 'delete.svg');
}

function refillArray() {
	if (JSON.parse(localStorage.getItem('ideaArray')) === null) {
		return;
  } else {
  var newArray = JSON.parse(localStorage.getItem('ideaArray')).map(function(array) {
    return new Idea(array.title, array.body, array.data, array.star, array.quality);
  });
	ideaArray = newArray};
}

function createIdea() {
	var idea = new Idea(titleInput.value, bodyInput.value, Date.now(), false, 0);
	ideaArray.push(idea);
	idea.storeIdea(ideaArray);
	titleInput.value = "";
	bodyInput.value = "";
	displayIdeaCard(idea);
	handleSaveBtn();
}

function displayIdeaCard({title, body, data, star, quality}) {
  noIdea.classList.add('hidden');
	var starSrc = star ? 'star-active.svg' : 'star.svg';
	outputField.insertAdjacentHTML('afterbegin', 	
		`<section class="idea-box" data-id=${data}>
			<header class="idea-header">
				<input type="image" class="star-button" src="idea-box-icons/${starSrc}">
				<input type="image" src="idea-box-icons/delete.svg" class="delete-button">
			</header>
			<article class="idea-article">
				<p class="idea-article-title" contenteditable="true">${title}<p>
				<p class="idea-article-body" contenteditable="true">${body}</p>
			</article>
			<footer class="idea-footer">
				<input type="image" class="upvote-button" src="idea-box-icons/upvote.svg">
				<p class= "quality-text">Quality:&nbsp;&nbsp;${qualityRating[quality]}</p>
				<input type="image" class="downvote-button" src="idea-box-icons/downvote.svg">
			</footer>
		</section>`);
}

function repopulateIdeaCards() {
	for (var i = 0; i < ideaArray.length; i++) {
		displayIdeaCard(ideaArray[i]);
	}
}

function handleCardEdit(e) {
  if (e.keyCode === 13) {
  	var title = e.target.closest('.idea-article').querySelector('.idea-article-title').innerText;
  	var body = e.target.closest('.idea-article').querySelector('.idea-article-body').innerText;
    e.target.blur();
    var targetIdea = getIdeaFromArray(e);
    targetIdea.updateIdea(title, body);
    targetIdea.storeIdea(ideaArray);
  }
}

function focusOutEvent(e) {
	if (e.target.className === 'idea-article-body' || e.target.className === 'idea-article-title') {
 	var title = e.target.closest('.idea-article').querySelector('#idea-title').innerText;
	var body = e.target.closest('.idea-article').querySelector('#idea-body').innerText;
	var targetIdea = getIdeaFromArray(e);
  targetIdea.updateIdea(title, body);
  targetIdea.storeIdea(ideaArray);
	}
}

function handleSaveBtn() {
	saveBtn.disabled = !titleInput.value || !bodyInput.value;
}

function deleteCard(e) {
	if (e.target.classList.contains('delete-button')) {
	e.target.closest('.idea-box').remove();
	var targetIdea = getIdeaFromArray(e);
	targetIdea.removeIdea(targetIdea);
	}
  placeholder();
}

function toggleStar(e) {
	if (e.target.classList.contains('star-button')) {
	var targetIdea = getIdeaFromArray(e);
	targetIdea.updateStar(); 
	var starPath = targetIdea.star ? 'idea-box-icons/star-active.svg' : 'idea-box-icons/star.svg'
	e.target.setAttribute('src', starPath)
	targetIdea.storeIdea(ideaArray);
	}
}

function toggleVote(e, vote, location) {
	if (e.target.classList.contains(location)) {
	var qualityText = e.target.closest('.idea-footer').querySelector('.quality-text');
	var targetIdea = getIdeaFromArray(e);
	targetIdea.updateQuality(vote);
	changeQualityText(targetIdea, qualityText);
	}
}

function cardButtonHover(e, location, activeButton) {
  if (e.target.classList.contains(location)) {
    e.target.setAttribute('src', `idea-box-icons/${activeButton}`);
  }
}

function cardButtonHoverOut(e, location, normalButton) {
  if (e.target.classList.contains(location)) {
    e.target.setAttribute('src', `idea-box-icons/${normalButton}`)
  }
}

function searchByQuality(e, qualityIndex, location) {
	if (e.target.classList.contains(location)) {	
		var qualityFilteredIdeas = ideaArray.filter(function(idea) {
			return idea.quality === qualityIndex;
		});
		outputField.innerHTML = '';
		qualityFilteredIdeas.forEach(function(idea) {
			displayIdeaCard(idea);
		});
	}
}

function changeQualityText(targetIdea, qualityText) {
	qualityText.innerText = "Quality:  " + targetIdea.qualityRating;
	targetIdea.storeIdea(ideaArray);
}

function findIdea(id) {
	return ideaArray.find(function(idea) {
		return idea.data == id;
	});
}

function getIdeaFromArray(e) {
	var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
	var targetIdea = findIdea(ideaId);
	return targetIdea;
}

function handleSearch() {
	outputField.innerHTML = '';
  var searchText = document.querySelector('#search-ideas-input').value.toLowerCase();
  if(starredIdeasBtn.innerHTML === 'View All Ideas') {
    searchStarFilter(searchText);
  } 
  else { 
  	searchAllFilter(searchText);
}

function searchAllFilter(searchText) {
    var filteredIdeas = ideaArray.filter(function(idea) {
      return (idea.title.toLowerCase().includes(searchText) || idea.body.toLowerCase().includes(searchText)) 
    });
    filteredIdeas.forEach(function(idea) {
      displayIdeaCard(idea);
    });
  }
}

function searchStarFilter(searchText) {
  var filteredIdeas = ideaArray.filter(function(idea) {
    return (idea.title.toLowerCase().includes(searchText) && idea.star === true || idea.body.toLowerCase().includes(searchText) && idea.star === true);
  });
  filteredIdeas.forEach(function(idea) {
    displayIdeaCard(idea);
  });
}

function searchQualityFilter(searchText, qualityIndex) {
	var filteredIdeas = ideaArray.filter(function(idea) {
		return (idea.quality === qualityIndex)
	});
	filteredIdeas.forEach(function(idea) {
		displayIdeaCard(idea);
	})
}

function handleStarButton() {
	outputField.innerHTML = `<p class="no-starred-idea-yet no-starred-idea-yet2">Please star some ideas!</p>`;
	if (starredIdeasBtn.innerHTML === 'Show Starred Ideas') {
		showStarredIdeas();
    starPlaceholder();
	} else {
		repopulateIdeaCards();
		starredIdeasBtn.innerHTML = 'Show Starred Ideas';
	}
}

function showStarredIdeas() {
    var filteredStarIdeas = ideaArray.filter(function(idea) {
      return idea.star === true;
    });
    filteredStarIdeas.forEach(function(idea) {
      displayIdeaCard(idea);
    });
    starredIdeasBtn.innerHTML = 'View All Ideas';
}

function classToggle(e) {
  const navs = document.querySelectorAll('.Navbar__Items');
  navs.forEach(function(nav) {
    nav.classList.toggle('Navbar__ToggleShow');
  });
  outputField.classList.toggle('change');
  mainOpacity.classList.toggle('change');
}

function handleShowMoreLess(e) {
	e.preventDefault();
	outputField.innerHTML = '';
	if (tenIdeasBtn.innerHTML === "Show Less") {
		toggleTenIdeas(e);
	} else if (tenIdeasBtn.innerHTML === "Show More"){
		toggleMoreIdeas(e);
	}
} 

function toggleTenIdeas(e) {
	var begin = ideaArray.length - 10;
	var end = begin + 11;
	var tenIdeas = ideaArray.slice(begin, end);
	tenIdeas.forEach(function(idea){
		displayIdeaCard(idea)});
	tenIdeasBtn.innerHTML = "Show More"
}

function toggleMoreIdeas(e) {
	ideaArray.forEach(function(idea){
		displayIdeaCard(idea);
	})
	tenIdeasBtn.innerHTML = "Show Less"
}	

function placeholder() {
  if (ideaArray.length === 0) {
    noIdea.classList.remove('hidden');
  } else if (ideaArray.length !== 0) {
    noIdea.classList.add('hidden');
  }
}

// function starPlaceholder() {
//   var filteredIdeas = ideaArray.filter(function(idea) {
//     return (idea.star === true)
//   });
//   if (filteredIdeas.length === 0) {
//     noStarredIdea.classList.remove('no-starred-idea-yet2');
//     console.log(noStarredIdea.classList)
//   }
// }