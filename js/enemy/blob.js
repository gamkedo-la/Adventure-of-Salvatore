class blobClass extends enemyClass {
	constructor() {
		super();
		this.name="blob";
		this.speed = 2;
		this.width = 50; 
		this.height = 47;
		this.maxHealth = 10;
		this.health = this.maxHealth;
		this.speed = 0;
		this.offSetWidth = 0;
		this.offSetHeight = 0;
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
	}
	
	superClassReset = super.enemyReset;
	reset() {
		this.superClassReset();
        this.name="blob";
        this.speed = 2;
		this.health = this.maxHealth;
		this.width = 50; 
		this.height = 47;
		this.maxHealth = 10;
		this.speed = 0;
		this.offSetWidth = 0;
		this.offSetHeight = 0;
		this.canUseRangeAttack = false;
		this.canUseMeleeAttack = true;
	}

	superClassInitialize = super.init;
	init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.reset();
	}	
		
	superClassMove = super.movement;
	movement = function() {
		this.superClassMove();
	}
	
	draw(){
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
			isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
	}
}