
orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     

ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];     


function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.xv;
	this.yv;
	this.width = 40; //30
	this.height = 40; //30
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	
	this.maxHealth = 2;
	this.speed = 3;
	this.health = this.maxHealth;
	
	this.movementTimer = 0;
	this.moveNorth = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;

	this.animateEnemyStandingStill = false;
	this.drawTimer = 0;
	this.frames = 8;

	this.myShotList = [];
	this.totalShots = 5;
	
	this.enemyReset = function() {
		this.speed = 3;
		this.hitPoints = this.maxHitPoints;
				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == this.myTile) {
					var tileRow = Math.floor(i/ROOM_COLS);
					var tileCol	= i%ROOM_COLS;
					
					this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
					this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

					roomGrid[i] = TILE_ROAD;
					break;
				} 
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}
					
	this.init = function(whichGraphic, whichName, whichTile) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.myTile = whichTile;
		this.enemyReset();
	}	
	 
	this.movement = function() {
		
		var nextX = this.x; 
		var nextY = this.y; 
		
		this.randomMovements();
		this.speed = 1.0;
		
		if(this.moveNorth && this.moveWest){
			nextX -= this.speed;
			this.offSetHeight = this.height * 6;
		} else if(this.moveNorth && this.moveEast){
			nextY -= this.speed;
			this.offSetHeight = this.height * 4;
		} else if(this.moveSouth && this.moveWest){
			nextY += this.speed;
			this.offSetHeight = this.height * 8;
		} else if(this.moveSouth && this.moveEast){
			nextX += this.speed;
			this.offSetHeight = this.height * 2;
		} else if(this.moveNorth){
			nextX -= this.speed * Math.cos(45); 
			nextY -= this.speed * Math.sin(45);
			this.offSetHeight = this.height * 5;
			collisionY = nextY;
		} else if(this.moveEast){
			nextX += this.speed * Math.cos(45); 
			nextY -= this.speed * Math.sin(45);
			this.offSetHeight = this.height * 3 
		} else if(this.moveSouth){
			nextX += this.speed * Math.cos(45); 
			nextY += this.speed * Math.sin(45);
			this.offSetHeight = this.height * 1;
		} else if(this.moveWest){
			nextX -= this.speed * Math.cos(45);
			nextY += this.speed * Math.sin(45);
			this.offSetHeight = this.height * 7 
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		this.xv = nextX;
		this.yv = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}
	
		switch(walkIntoTileType) {
			case TILE_ROAD:
			case TILE_SPEED_POTION:
			case TILE_KEY_BLUE:
			case TILE_KEY_GREEN:
			case TILE_KEY_RED:
			case TILE_KEY_YELLOW:
				this.x = nextX;
				this.y = nextY;
				break;					
			case TILE_WALL:
			case TILE_SPIKES_ARMED:
			case TILE_SPIKES_UNARMED:
			case TILE_PITTRAP_ARMED:
			case TILE_PITTRAP_UNARMED:
			case TILE_TREASURE:
			case TILE_FINISH:			
			case TILE_YELLOW_DOOR:
			case TILE_RED_DOOR:
			case TILE_BLUE_DOOR:
			case TILE_TABLE:
			default:
				this.movementTimer = 0;
				break;
		} 

		let toAttack = Math.round(Math.random() * 1000);
		if(toAttack > 990){
			this.rangedAttack();
		}

		for (i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();
		}
	};
	
	this.randomMovements = function(){
		var whichDirection =  Math.round(Math.random() * 10);        //* Keeping enemy still while testing combat */
		this.movementTimer--;
	
		if(this.movementTimer <= 0){
			switch(whichDirection) {
				case 0:
				case 1:
					this.resetDirections();
					this.moveNorth = true;					
					this.movementTimer = 300;
					break;
				case 2:
					this.resetDirections();
					this.moveNorth = true;
					this.moveWest = true;					
					this.movementTimer = 300;
					break;
				case 3:
					this.resetDirections();
					this.moveWest = true;
					this.movementTimer = 300;
					break;
				case 4:
					this.resetDirections();
					this.moveWest = true;
					this.moveSouth = true;
					this.movementTimer = 300;
					break;
				case 5:
					this.resetDirections();
					this.moveSouth = true;
					this.movementTimer = 300;
					break;
				case 6:
					this.resetDirections();
					this.moveSouth = true;
					this.moveEast = true;
					this.movementTimer = 300;
					break;
				case 7:
					this.resetDirections();
					this.moveEast = true;
					this.movementTimer = 300;
					break;
				case 8:
				case 9:
				case 10:
					this.resetDirections();
					this.movementTimer = 300;
					break;
			}
		}
	}
	
	this.resetDirections = function(){
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}	
	
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			if(this.moveNorth){
				this.canMoveNorth = false;
				this.resetDirections();
				this.moveSouth = true;
				this.y += this.speed;
			} else if(this.moveEast){
				this.canMoveEast = false;
				this.resetDirections();
				this.moveWest = true;
				this.x -= this.speed;
			} else if(this.moveSouth){
				this.canMoveSouth = false;
				this.resetDirections();
				this.moveNorth = true;
				this.y -= this.speed;
			} else if(this.moveWest){
				this.canMoveWest = false;
				this.resetDirections();
				this.moveEast = true;
				this.x += this.speed;				
			}
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	}
	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}

	this.rangedAttack = function(){
		console.log("Mini Cyclops attack")
		crashIntoConeSound.play();

//		if(this.myShotList.length < this.totalShots){
			let tempShot = new shotClass();
			tempShot.shootFrom(this);
			this.myShotList.push(tempShot);
//		} 
	}
		
	this.draw = function(){
		for (i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}

		if(this.offSetHeight == 0){ //enemy is standing still
			let toAnimateEnemyNumber = getRndInteger(0, 1000);
			if(toAnimateEnemyNumber > 995){
				this.animateEnemyStandingStill = true;
			}
			if(this.animateEnemyStandingStill){
				this.animateEnemy()
			}
		} else { //player is moving
			this.animateEnemy();
		}
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height + ISO_SHADOW_OFFSET_Y);
		colorText(this.myName, isoDrawX + 20, isoDrawY - 30, "black", "8px Arial Black");
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		//displays health
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 10, 10, "green");	
	}

	this.animateEnemy = function(){
		this.drawTimer++;
		if(this.drawTimer == 8){
			this.offSetWidth = this.offSetWidth + this.width;
			this.drawTimer = 0;
		}
		if(this.offSetWidth > (this.frames * this.width)){
			this.offSetWidth = 0;
			this.animateEnemyStandingStill = false;
		}
	}
}
