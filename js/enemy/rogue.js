class rogue extends enemyClass { 
	
    constructor() {
        console.log("Rogue constructor!");
        super(); // run enemyClass constructor first
        this.maxHealth = 2;
        this.speed = 6;
        this.canUseRangeAttack = true;
    }
	
	rogueReset() {
        console.log("rogueReset");
		this.canUseRangeAttack = true;
		this.speed = 6;
		this.width = 32; 
		this.height = 48;
		this.hitPoints = this.maxHitPoints;
	}
					
	init(whichGraphic, whichName, whichTile) {
        console.log("rogue.init: "+ whichName);
        super.init(whichGraphic, whichName, whichTile);
		this.rogueReset();
	}	
		
	movement() {
        super.movement();
	}
	
	draw(){
		super.draw();
	}
}