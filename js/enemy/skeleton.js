skeletonNames = ["Ralf"];

skeletonClass.prototype = new enemyClass();
function skeletonClass() {
	this.width = 20; 
	this.height = 40; 
	this.maxHealth = 4;
	this.speed = 6;
	this.totalShots = 0;
	this.canUseRangeAttack = false;
	
	this.superClassReset = this.enemyReset;
	this.reset = function() {
		this.superClassReset();
		this.speed = 6;
		this.totalShots = 0;
		this.hitPoints = this.maxHitPoints;
		this.canUseRangeAttack = false;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);	
		this.canUseRangeAttack = true;
		this.reset();
	}	
		
	this.superClassMove = this.movement;
	this.movement = function() {
		this.superClassMove();
	}
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		this.superClassDraw();
	}
}