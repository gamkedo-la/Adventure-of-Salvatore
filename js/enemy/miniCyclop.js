class MiniCyclop extends enemyClass { 
	
    constructor() {
        console.log("MiniCyclop constructor!");
        super(); // run enemyClass constructor first
        this.name = "miniCyclop";
        this.maxHealth = 4;
        this.speed = 4;
        this.canUseRangeAttack = true;
		this.canUseMeleeAttack = false;
    }
	
	miniCyclopReset() {
        console.log("miniCyclopReset");
		this.canUseRangeAttack = true;
		this.canUseMeleeAttack = false;
		this.speed = 4;
		this.width = 40; 
		this.height = 41;
		this.health = this.maxHealth;
	}
					
	init(whichGraphic, whichName, whichTile) {
        console.log("miniCyclop.init: "+ whichName);
        super.init(whichGraphic, whichName, whichTile);
		this.miniCyclopReset();
	}	
		
	movement() {
        //console.log("miniCyclop.movement");
        super.movement();
	}
	
	draw(){
        //console.log("miniCyclop.draw");
		super.draw();
	}
}
