blobNames = ["Ooze"];

blobClass.prototype = new enemyClass();
function blobClass() {

	
	this.superClassReset = this.reset;
	this.reset  = function() {
		this.superClassReset();
		this.speed = 2;
		this.hitPoints = this.maxHitPoints;
		this.width = 50; 
		this.height = 47;
		this.maxHealth = 10;
		this.speed = 0;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.miniCyclopReset();
	}	
		
	this.superClassMove = this.movement;
	this.movement = function() {
	}
	
	this.draw = function(){
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
			isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
	}
}