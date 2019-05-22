class Idea {
	constructor(title, body){
		this.title = title;
		this.body = body;
		this.data = Date.now();
		this.star = false;
		this.quality = 0;
	}

	storeIdea(idea){
		localStorage.setItem(this.data,JSON.stringify(idea));
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