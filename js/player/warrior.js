const ISO_CHAR_FOOT_Y = 8;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)

function warriorClass() {
	this.x = 600;
	this.y = 800;
	this.width = 40;
	this.height = 40;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	this.playerMovementSpeed = 3.0;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.controlKeyForSwordSwing = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;	
	this.health = 4;
	this.maxHealth = 4;
	this.trapCoolDownTimer = 0;
	this.trapCoolDownCounter = 0;
	this.frames = 8;
	this.drawTimer = 0;
	this.animatePlayerStandingStill = false;
	//items
	this.healthPotion = 0;
	this.speedPotion = 3;
	this.coins = 0;
	this.greenKeysHeld = 0;
	this.blueKeysHeld = 1;
	this.redKeysHeld = 0;
	this.yellowKeysHeld = 0;
	//affects
	this.speedIncrease = false;
	this.speedIncreaseTimer = 0;
	this.displaySpeedIncreaseTimer = false;
	this.leverCoolDown = 0;
	this.leverCoolDownActive = false;
	this.swordReady = true;
	this.swordCharge = false;
	this.swordChargeTimer = 0;

	this.warriorPic = document.createElement("img");
	
	this.setupControls = function(northKey,eastKey,southKey,westKey,swordKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;;
		this.controlKeyForSwordSwing = swordKey;
	}

	this.warriorReset = function() {
		this.speed = 0;
		this.keysHeld = 1;
					
		for(var i=0; i<roomGrid.length; i++){
			if( roomGrid[i] == TILE_PLAYER) {
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol	= i%ROOM_COLS;
				var tileLeftEdgeX = 700
				var tileTopEdgeY = 0;

				this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
				this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

				roomGrid[i] = TILE_ROAD;
				break;
			}
		}
	
		this.x = this.homeX;
		this.y = this.homeY;
		this.miniMapX = this.homeX + 750;
		this.miniMapY = this.homeY + 2;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	
	 
	this.movement = function() {
		if(this.swordCharge){
			this.swordChargeTimer++;
			if(this.swordChargeTimer >= 50){
				this.swordReady = true;
				this.swordCharge = false;
				this.swordChargeTimer = 0;
			}
		}
		
		if(this.speedIncrease){
			this.playerMovementSpeed = 6;
			this.speedIncreaseTimer--;
			this.displaySpeedIncreaseTimer = true;
			if(this.speedIncreaseTimer == 0){
				this.speedIncrease = false;
				this.displaySpeedIncreaseTimer = false;
			}
		} else {
			this.playerMovementSpeed = 3;
		}
		var nextX = this.x; 
		var nextY = this.y; 
		var collisionX = nextX;
		var collisionY = nextY;
		if(this.keyHeld_North && this.keyHeld_West){
			nextX -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 6;
			this.miniMapX -= this.playerMovementSpeed/15;
		} else if(this.keyHeld_North && this.keyHeld_East){
			nextY -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 4;
			this.miniMapY -= this.playerMovementSpeed/15;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextY += this.playerMovementSpeed;
			this.offSetHeight = this.height * 8;
			this.miniMapY += this.playerMovementSpeed/15;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextX += this.playerMovementSpeed;
			this.offSetHeight = this.height * 2;
			this.miniMapX += this.playerMovementSpeed/15;
		} else if(this.keyHeld_North && this.canMoveNorth){
			nextX -= this.playerMovementSpeed * Math.cos(45); 
			nextY -= this.playerMovementSpeed * Math.sin(45);
			this.offSetHeight = this.height * 5;
			collisionY = nextY;
		} else if(this.keyHeld_East && this.canMoveEast){
			nextX += this.playerMovementSpeed * Math.cos(45); 
			nextY -= this.playerMovementSpeed * Math.sin(45);
			this.offSetHeight = this.height * 3 
			this.miniMapX += this.playerMovementSpeed/10;
			this.miniMapY -= this.playerMovementSpeed/10;
		} else if(this.keyHeld_South && this.canMoveSouth){
			nextX += this.playerMovementSpeed * Math.cos(45); 
			nextY += this.playerMovementSpeed * Math.sin(45);
			this.offSetHeight = this.height * 1;
			this.miniMapX += this.playerMovementSpeed/10;
			this.miniMapY += this.playerMovementSpeed/10; 
		} else if(this.keyHeld_West && this.canMoveWest){
			nextX -= this.playerMovementSpeed * Math.cos(45);
			nextY += this.playerMovementSpeed * Math.sin(45);
			this.offSetHeight = this.height * 7 
			this.miniMapX += this.playerMovementSpeed/10;
			this.miniMapY += this.playerMovementSpeed/10;
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_WALL;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_ROAD:
			case TILE_SPIKES_UNARMED:
			case TILE_WALL_3:	
			case TILE_PITTRAP_UNARMED:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_YELLOW_DOOR:
				if(this.yellowKeysHeld > 0){
					this.yellowKeysHeld--;
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				}
				break;
			case TILE_RED_DOOR:
				if(this.redKeysHeld > 0){
					this.redKeysHeld--;
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				}
				break;
			case TILE_BLUE_DOOR:
				if(this.blueKeysHeld > 0){
					this.blueKeysHeld--;
					roomGrid[walkIntoTileIndex] = TILE_ROAD;
				}
				break;	
			case TILE_TREASURE:	
				this.yellowKeysHeld--;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_KEY_YELLOW:	
				this.yellowKeysHeld++;			
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_KEY_BLUE:	
				this.blueKeysHeld++;			
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;	
			case TILE_KEY_GREEN:	
				this.greenKeysHeld++;			
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_KEY_RED:
				this.redKeysHeld++;			
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;				
			case TILE_FINISH:
			case TILE_STAIRS_DOWN:
				console.log("Stair 2");
				loadLevel(levelTwo);
				break;
			case TILE_STAIRS:
				this.warriorReset();
				break;			
			case TILE_PITTRAP_ARMED:
				this.takeDamageFromTrap(1);
				roomGrid[walkIntoTileIndex] = TILE_PITTRAP_UNARMED;
				crashIntoConeSound.play();
				break;
			case TILE_SPIKES_ARMED:
				this.takeDamageFromTrap(1);
				roomGrid[walkIntoTileIndex] = TILE_SPIKES_UNARMED;
				crashIntoConeSound.play();
				break;
			case TILE_HEALING_POTION:
				this.healthPotion++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_SPEED_POTION:
				this.speedPotion++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_COIN:
				this.coins++;
				roomGrid[walkIntoTileIndex] = TILE_ROAD;
				break;
			case TILE_WALL_LEVER_1:
				if(!this.leverCoolDownActive){
					roomGrid[walkIntoTileIndex] = TILE_WALL_LEVER_2;
					console.log("Walked in Lever 1");
					this.leverCoolDownActive = true;
					roomGrid[426] = TILE_WALL;
				}
				break;
			case TILE_WALL_LEVER_2:
				if(!this.leverCoolDownActive){
					roomGrid[walkIntoTileIndex] = TILE_WALL_LEVER_1;
					console.log("Walked in Lever 2");
					this.leverCoolDownActive = true;
					roomGrid[426] = TILE_WALL_3;
				}
				break;
			case TILE_WALL:
			case TILE_WALL_WITH_TORCH:
			case TILE_TABLE:
			case TILE_BOOKSHELF:
			default:
				break;
		} // END OF SWITCH CASE		
		this.trapCoolDown();
		if(this.leverCoolDownActive){
			this.leverCoolDown++;
			if(this.leverCoolDown == 100){
				this.leverCoolDown = 0;
				this.leverCoolDownActive = false
			}
		}
	};	// END OF THIS.MOVEMENT
		
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			console.log("collision");
			if(this.keyHeld_North){
				this.canMoveNorth = false;
				this.y += this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				this.x -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				this.y -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				this.x += this.playerMovementSpeed * COLLIDE_BUMP_MULT;				
			}
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	};
	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		if(this.offSetHeight == 0){ //player is standing still
			let toAnimatePlayerNumber = getRndInteger(0, 1000);
			if(toAnimatePlayerNumber > 995){
				this.animatePlayerStandingStill = true;
			}
			if(this.animatePlayerStandingStill){
				this.animateWarrior()
			}
		} else { //player is moving
			this.animateWarrior();
		}
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		if(this.displaySpeedIncreaseTimer){
			let displaySeconds = Math.ceil(this.speedIncreaseTimer/60)
			colorText("Speed: " + displaySeconds, isoDrawX-40, isoDrawY-60, "green");		
		}
	
		//colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, 24, 9, "red");
		//colorRect(isoDrawX-(this.width/2) + 3, isoDrawY-this.height - 19, (this.health / this.maxHealth) * 24, 9, "green");
		//canvasContext.drawImage(healthbarPic,isoDrawX-(this.width/2), isoDrawY-this.height - 20);
		//colorRect(this.miniMapX, this.miniMapY, 4, 4, "green");	
	}

	this.useSpeedPotion = function(){
		if(this.speedPotion <= 0){
			console.log("No Speed Potions to use");
			return;
		}
		if(this.speedIncrease){
			console.log("Speed already increased");
			return;
		}
		this.speedPotion--;
		this.speedIncrease = true;
		this.speedIncreaseTimer = 1000;
	}



	this.animateWarrior = function(){
		this.drawTimer++;
		if(this.drawTimer == 8){
			this.offSetWidth = this.offSetWidth + this.width;
			this.drawTimer = 0;
		}
		if(this.offSetWidth > (this.frames * this.width)){
			this.offSetWidth = 0;
			this.animatePlayerStandingStill = false;
		}
	}
		
	//this delivers damage to the player when setting off a trap
	this.takeDamageFromTrap = function(howMuchDamage){
		if(this.trapCoolDownCounter == 0){
			this.health = this.health - howMuchDamage;
		}
		trapCoolDownTimer = true;
	}
	
	//this is used to keep traps from constantly causing damage to the player
	this.trapCoolDown = function(){
		if(this.trapCoolDownTimer == true){
			this.trapCoolDownCounter++
		}
		if(this.trapCoolDownCounter == 120){
			this.trapCoolDownCounter = 0;
			this.trapCoolDownTimer = false;
		}
	}

	this.swordSwing = function (){
		console.log("Sword Swing");
		for(var i = 0; i < miniCyclopList.length; i++){
			this.checkCollisionsAgainst(miniCyclopList[i]);
		}
		this.swordReady = false;
		this.swordCharge = true;
		swordSwingSound.play();
	};	
}