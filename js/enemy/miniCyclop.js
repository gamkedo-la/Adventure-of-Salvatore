miniCyclopNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];

class MiniCyclop extends enemyClass { 
	
    constructor() {
        console.log("MiniCyclop constructor!");
        super(); // run enemyClass constructor first
        this.maxHealth = 4;
        this.speed = 4;
        this.canUseRangeAttack = true;
    }
	
	miniCyclopReset() {
        console.log("miniCyclopReset");
		this.canUseRangeAttack = true;
		this.speed = 4;
		this.width = 40; 
		this.height = 41;
		this.hitPoints = this.maxHitPoints;
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
