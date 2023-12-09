miniCyclopNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];

miniCyclop.prototype = new enemyClass();
function miniCyclop() {
	this.width = 40; 
	this.height = 40; 
	this.maxHealth = 4;
	this.speed = 4;
	this.myShotList = [];
	this.totalShots = 5;
	
	this.superClassReset = this.enemyReset;
	this.miniCyclopReset = function() {
		this.superClassReset();
		this.speed = 4;
		this.hitPoints = this.maxHitPoints;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.miniCyclopReset();
	}	
		
	this.superClassMove = this.movement;
	this.movement = function() {	
	}

	this.attack = function(){
		crashIntoConeSound.play();
		console.log("Mini Cyclops attack")
		if(this.myShotList.length < this.totalShots){
			let tempShot = new shotClass();
			tempShot.shootFrom(this);
			this.myShotList.push(tempShot);
		}
	}
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		this.superClassDraw();
	}
}