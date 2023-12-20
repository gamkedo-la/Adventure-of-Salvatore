blobNames = ["Ooze"];

blobClass.prototype = new enemyClass();
function blobClass() {
	this.width = 50; 
	this.height = 47; 
	this.maxHealth = 10;
	this.speed = 0;
	
	this.superClassReset = this.enemyReset;
	this.miniCyclopReset = function() {
		this.superClassReset();
		this.speed = 2;
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
	
	this.superClassDraw = this.
	draw;
	this.draw = function(){
		this.superClassDraw();
        console.log()
	}
}