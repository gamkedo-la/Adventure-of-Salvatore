kregNames = ["Kreg"];

kregClass.prototype = new enemyClass();
function kregClass() {
	this.width = 65; 
	this.height = 66; 
	this.maxHealth = 15;
	this.speed = 4;
	this.totalShots = 0;
	this.canUseRangeAttack = false;
	
	this.superClassReset = this.enemyReset;
	this.reset = function() {
		this.superClassReset();
		this.speed = 4;
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
		this.checkForMeleeCombatRange();
	}
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		this.superClassDraw();
	}
}