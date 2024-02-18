skeletonNames = ["Ralf"];

class skeletonClass extends enemyClass {
	width = 20; 
	height = 40; 
	maxHealth = 4;
	speed = 6;
	totalShots = 0;
	canUseRangeAttack = false;
	canUseMeleeAttack = true;

	superClassReset = super.enemyReset;
	reset = function() {
		this.superClassReset();
		this.speed = 6;
		this.totalShots = 0;
		this.hitPoints = this.maxHitPoints;
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
	}
					
	superClassInitialize = super.init;
	init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);	
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
		this.reset();
	}	
		
	superClassMove = super.movement;
	movement = function() {
		this.superClassMove();
		// this.checkForMeleeCombatRange();
	}
	
	superClassDraw = super.draw;
	draw = function(){
		this.superClassDraw();
	}
}