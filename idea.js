class Idea {
	constructor(title, body){
		this.title = title;
		this.body = body;
		this.data = Date.now();
		this.star = false;
		this.quality = 0;
	}

	storeIdea(ideaArray){
		localStorage.setItem('ideas',JSON.stringify(ideaArray));
	}

	removeIdea(){
		localStorage.removeItem();
	}

	updateIdea(){

	}

	updateQuality(){
		this.quality++
	}
};