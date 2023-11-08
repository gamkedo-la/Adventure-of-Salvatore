miniCyclopNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];

miniCyclop.prototype = new enemyClass();

function miniCyclop() {
	this.width = 40; // This should go into the Rat Init
	this.height = 40; 
	this.maxHealth = 4;
	this.speed = 4;
	
	this.superClassReset = this.enemyReset;
	this.miniCyclopReset = function() {
		this.superClassReset();
		this.speed = 4;
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
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		this.superClassDraw();
	}
