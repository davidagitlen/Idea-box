class Idea {
	constructor(title, body, data, star, quality){
		this.title = title;
		this.body = body;
		this.data = data;
		this.star = star || false;
		this.quality = quality || 0;
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

	updateQuality(){
		//this.quality++
	}
};