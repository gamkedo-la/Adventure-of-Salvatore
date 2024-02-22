class rogue extends enemyClass { 
    constructor() {
        console.log("Rogue constructor!");
        super(); // run enemyClass constructor first
        this.name = "rogue";
        this.maxHealth = 2;
        this.speed = 6;
        this.canUseRangeAttack = true;
		this.canUseMeleeAttack = false;
    }
	
	rogueReset() {
        console.log("rogueReset");
		this.canUseRangeAttack = true;
		this.canUseMeleeAttack = false;

		this.speed = 6;
		this.width = 32; 
		this.height = 48;
		this.health = this.maxHealth;
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