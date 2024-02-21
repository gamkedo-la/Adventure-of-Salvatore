kregNames = ["Kreg"];

class kregClass extends enemyClass {
	width = 65; 
	height = 66; 
	maxHealth = 15;
	speed = 4;
	totalShots = 0;
	canUseRangeAttack = false;
	canUseMeleeAttack = true;
	
	reset() {
		super.enemyReset();
        this.name="kreg";
		this.speed = 4;
		this.totalShots = 0;
		this.hitPoints = this.maxHitPoints;
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
	}
					
	init(whichGraphic, whichName, whichTile) {
		super.init(whichGraphic, whichName, whichTile);	
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
		this.reset();
	}	
		
	movement() {
		super.movement();
		// this.checkForMeleeCombatRange();
	}
	
	draw() {
		super.draw();
	}
}