skeletonNames = ["Ralf"];

skeletonClass.prototype = new enemyClass();
function skeletonClass() {

	this.superClassReset = this.reset;
	this.reset  = function() {
		this.speed = 5;
		this.hitPoints = this.maxHitPoints;
		this.width = 20; 
		this.height = 40;
		this.maxHealth = 5;
		this.offSetWidth = 0;
		this.offSetHeight = 0;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.reset();
	}	
		
	this.superClassMove = this.movement;
	this.movement = function() {
		this.superClassMove();
	}
	
	this.draw = function(){
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
			isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
	}
}