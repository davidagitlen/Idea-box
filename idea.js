class Idea {
	constructor(title, body, data){
		this.title = title;
		this.body = body;
		this.data = data;
		this.star = false;
		this.quality = 0;
	}

	storeIdea(ideaArray){
		localStorage.setItem('ideaArray',JSON.stringify(ideaArray));
	}

	removeIdea(e){
		console.log('hey');
		var ideaId = e.target.closest('.idea-box').getAttribute('data-id');
		var updatedArray = ideaArray.filter(function(arrayItem){
			if(arrayItem.data !== parseInt(ideaId)) {
				return arrayItem
			}
		})
		ideaArray = updatedArray;
		this.storeIdea(ideaArray);
	};

	updateIdea(){

	}

	updateQuality(){
		this.quality++
	}
};