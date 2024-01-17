miniCyclopNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];

MiniCyclop.prototype = new enemyClass();
function MiniCyclop() { 
	this.maxHealth = 4;
	this.speed = 4;
	this.canUseRangeAttack = true;
	
	this.miniCyclopReset = function() {
		this.canUseRangeAttack = true;
		this.speed = 4;
		this.width = 40; 
		this.height = 41;
		this.hitPoints = this.maxHitPoints;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.miniCyclopReset();
	}	
		
	this.superClassMove = this.movement;
	this.movement = function() {
	}
	
	this.superClassDraw = this.
	draw;
	this.draw = function(){
		this.superClassDraw();
	}
}