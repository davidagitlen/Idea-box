class Idea {
	constructor(title, body, data, star, quality){
		this.title = title;
		this.body = body;
		this.data = data;
		this.star = star || false;
		this.quality = quality;
		this.qualityRating = ['Swill', 'Plausible', 'Genius'];
	}

	storeIdea(ideaArray){
		localStorage.setItem('ideaArray',JSON.stringify(ideaArray));
	}

	removeIdea(targetIdea){
		var updatedArray = ideaArray.filter(function(arrayItem){
			if(arrayItem.data !== targetIdea.data) {
				return arrayItem;
			}
		})
		ideaArray = updatedArray;
		this.storeIdea(ideaArray);
	}

	updateIdea(title, body){ 
		this.title = title;
		this.body = body;
 	}

 	updateStar() {
 		this.star = !this.star;
 	}

	updateQuality(vote){
		var qualityArray = ['Swill', 'Plausible', 'Genius'];
		if (vote === 'upvote' && this.quality !== 2){
			this.quality++
		} 
		if (vote === 'downvote' && this.quality !== 0) {
			this.quality-- 
		}
		this.qualityRating = qualityArray[this.quality];
		}
}