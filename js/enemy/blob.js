blobClass.prototype = new enemyClass();
function blobClass() {
	this.canUseRangeAttack = false;

	
	this.superClassReset = this.reset;
	this.reset  = function() {
		this.speed = 2;
		this.hitPoints = this.maxHitPoints;
		this.width = 50; 
		this.height = 47;
		this.maxHealth = 10;
		this.speed = 0;
		this.offSetWidth = 0;
		this.offSetHeight = 0;
		this.canUseRangeAttack = false;
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