class Idea {
	constructor(title, body){
		this.title = title;
		this.body = body;
		this.data = Date.now();
		this.star = false;
		this.quality = 0;
	}

	storeIdea(ideaArray){
		localStorage.setItem('ideaArray',JSON.stringify(ideaArray));
	}

	removeIdea(array){
		console.log('hey');
		var ideaArray = array.filter(function(idea) {
			return idea.data !== this.data
		});
		this.storeIdea(ideaArray);
	}

	updateIdea(){

	}

	updateQuality(){
		this.quality++
	}
};