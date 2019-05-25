class Idea {
	constructor(title, body, data, star, quality, qualityRating){
		this.title = title;
		this.body = body;
		this.data = data;
		this.star = star || false;
		this.quality = quality;
		this.qualityRating = qualityRating;
	}

	storeIdea(ideaArray){
		localStorage.setItem('ideaArray',JSON.stringify(ideaArray));
	}

	removeIdea(ideaId){
		var updatedArray = ideaArray.filter(function(arrayItem){
			if(arrayItem.data !== parseInt(ideaId)) {
				return arrayItem
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
};