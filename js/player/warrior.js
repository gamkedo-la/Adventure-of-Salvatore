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
	this.alive = true;
	this.health = 1;
	this.maxHealth = 4;
	this.damageCoolDownTimer = true;
	this.damageCoolDownCounter = 0;
	this.myShotList = [];

	this.frames = 8;
	this.drawTimer = 0;
	this.animatePlayerStandingStill = false;
	//items
	this.healthPotion = 1;
	this.speedPotion = 3;
	this.coins = 0;
	this.greenKeysHeld = 0;
	this.blueKeysHeld = 0;
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
    this.swordDamage = 1; // used in checkCollision() if playerAttacking
	this.playerAttacking = false;

	this.facingNorth = false;
	this.facingEast = false;
	this.facingSouth = false;
	this.facingWest = false;

	this.setupControls = function(
            northKey,eastKey,southKey,westKey,swordKey,
            northKey2,eastKey2,southKey2,westKey2,swordKey2,
            blockKey1,blockKey2,blockKey3,blockKey4) {
		
        this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
		this.controlKeyForSwordSwing = swordKey;

        this.controlKeyForNorth2 = northKey2;
		this.controlKeyForEast2 = eastKey2;			
		this.controlKeyForSouth2 = southKey2;
		this.controlKeyForWest2 = westKey2;
		this.controlKeyForSwordSwing2 = swordKey2;

        this.controlKeyForBlock1 = blockKey1;
        this.controlKeyForBlock2 = blockKey2;
        this.controlKeyForBlock3 = blockKey3;
        this.controlKeyForBlock4 = blockKey4;

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

		// face toward the camera (SW)
		this.facingNorth = false;
		this.facingEast = false;
		this.facingSouth = true;
		this.facingWest = true;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	
	 
	this.movement = function() {

        if (this.blockFramesleft) {
            this.blockFramesleft--;
            if (this.blockFramesleft==0) {
                console.log("block ended."); // just for debug
            }
        }

		if(this.health <= 0){
			this.alive = false;
		} else {
			this.alive = true;
		}
		if(this.alive){
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
			
			// NOTE: this.canMove* is false when blocked by entities but not walls!
			// so we look ahead a little
			var aheadX = this.x; 
			var aheadY = this.y; 

			if(this.keyHeld_North && this.keyHeld_West){
				nextX -= this.playerMovementSpeed;
				aheadX -= PLAYER_COLLISION_RADIUS;
				this.offSetHeight = this.height * 6;
				this.miniMapX -= this.playerMovementSpeed/15;
				this.facingNorth = true;
				this.facingEast = false;
				this.facingSouth = false;
				this.facingWest = true;
			} else if(this.keyHeld_North && this.keyHeld_East){
				nextY -= this.playerMovementSpeed;
				aheadY -= PLAYER_COLLISION_RADIUS;
				this.offSetHeight = this.height * 4;
				this.miniMapY -= this.playerMovementSpeed/15;
				this.facingNorth = true;
				this.facingEast = true;
				this.facingSouth = false;
				this.facingWest = false;
			} else if(this.keyHeld_South && this.keyHeld_West){
				nextY += this.playerMovementSpeed;
				aheadY += PLAYER_COLLISION_RADIUS;
				this.offSetHeight = this.height * 8;
				this.miniMapY += this.playerMovementSpeed/15;
				this.facingNorth = false;
				this.facingEast = false;
				this.facingSouth = true;
				this.facingWest = true;
			} else if(this.keyHeld_South && this.keyHeld_East){
				nextX += this.playerMovementSpeed;
				aheadX += PLAYER_COLLISION_RADIUS;
				this.offSetHeight = this.height * 2;
				this.miniMapX += this.playerMovementSpeed/15;
				this.facingNorth = false;
				this.facingEast = true;
				this.facingSouth = true;
				this.facingWest = false;
			} else if(this.keyHeld_North && this.canMoveNorth){
				nextX -= this.playerMovementSpeed * Math.cos(45); 
				nextY -= this.playerMovementSpeed * Math.sin(45);
				aheadX -= PLAYER_COLLISION_RADIUS * Math.cos(45); 
				aheadY -= PLAYER_COLLISION_RADIUS * Math.sin(45);
				this.offSetHeight = this.height * 5;
				collisionY = nextY;
				this.facingNorth = true;
				this.facingEast = false;
				this.facingSouth = false;
				this.facingWest = false;
			} else if(this.keyHeld_East && this.canMoveEast){
				nextX += this.playerMovementSpeed * Math.cos(45); 
				nextY -= this.playerMovementSpeed * Math.sin(45);
				aheadX += PLAYER_COLLISION_RADIUS * Math.cos(45); 
				aheadY -= PLAYER_COLLISION_RADIUS * Math.sin(45);
				this.offSetHeight = this.height * 3 
				this.miniMapX += this.playerMovementSpeed/10;
				this.miniMapY -= this.playerMovementSpeed/10;
				this.facingNorth = false;
				this.facingEast = true;
				this.facingSouth = false;
				this.facingWest = false;
			} else if(this.keyHeld_South && this.canMoveSouth){
				nextX += this.playerMovementSpeed * Math.cos(45); 
				nextY += this.playerMovementSpeed * Math.sin(45);
				aheadX += PLAYER_COLLISION_RADIUS * Math.cos(45); 
				aheadY += PLAYER_COLLISION_RADIUS * Math.sin(45);
				this.offSetHeight = this.height * 1;
				this.miniMapX += this.playerMovementSpeed/10;
				this.miniMapY += this.playerMovementSpeed/10; 
				this.facingNorth = false;
				this.facingEast = false;
				this.facingSouth = true;
				this.facingWest = false;
			} else if(this.keyHeld_West && this.canMoveWest){
				nextX -= this.playerMovementSpeed * Math.cos(45);
				nextY += this.playerMovementSpeed * Math.sin(45);
				aheadX -= PLAYER_COLLISION_RADIUS * Math.cos(45);
				aheadY += PLAYER_COLLISION_RADIUS * Math.sin(45);
				this.offSetHeight = this.height * 7 
				this.miniMapX += this.playerMovementSpeed/10;
				this.miniMapY += this.playerMovementSpeed/10;
				this.facingNorth = false;
				this.facingEast = false;
				this.facingSouth = false;
				this.facingWest = true;
			} else {
				this.offSetHeight = 0;
			}
			
			// fixme: the player might not actually move to nextX/Y
			this.miniMapX = nextX;
			this.miniMapY = nextY;
			
			var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
			var walkIntoTileType = roomGrid[walkIntoTileIndex];
			if (walkIntoTileType==undefined) walkIntoTileType = TILE_WALL;
			
			var lookAheadTileIndex = getTileIndexAtPixelCoord(aheadX,aheadY);
			var lookAheadTileType = roomGrid[lookAheadTileIndex];
			
			//console.log("walkInto "+nextX+","+nextY+"="+walkIntoTileType+" lookahead "+aheadX+","+aheadY+"="+lookAheadTileType);
			var blockedUpAhead = UNWALKABLE_TILES.includes(lookAheadTileType);
			
			switch(walkIntoTileType) {
				case TILE_ROAD:
				case TILE_RED_CARPET:
				case TILE_SPIKES_UNARMED:	
				case TILE_PITTRAP_UNARMED:
				case TILE_GREEN_DOOR_OPEN:
				case TILE_GREEN_DOOR_2_OPEN:
				case TILE_BLUE_DOOR_OPEN:
				case TILE_BLUE_DOOR_2_OPEN:
				case TILE_WOOD_DOOR_OPEN:	
				case TILE_WOOD_DOOR_2_OPEN:
				case TILE_WALL_3:
				case TILE_YELLOW_DOOR_OPEN:
				case TILE_YELLOW_DOOR_2_OPEN:
				case TILE_RED_DOOR_OPEN:
				case TILE_RED_DOOR_2_OPEN:
					if (!blockedUpAhead) {
						// the path in not blocked: update player position
						this.x = nextX;
						this.y = nextY;
					}
					break;
				case TILE_WOOD_DOOR:
						roomGrid[walkIntoTileIndex] = TILE_WOOD_DOOR_OPEN;
						doorOpenSound.play(); 
					break;
				case TILE_WOOD_DOOR_2:
					roomGrid[walkIntoTileIndex] = TILE_WOOD_DOOR_2_OPEN;
					doorOpenSound.play();
				break;
				case TILE_YELLOW_DOOR:
					if(this.yellowKeysHeld > 0){
						this.yellowKeysHeld--;
						roomGrid[walkIntoTileIndex] = TILE_YELLOW_DOOR_OPEN;
						doorOpenSound.play();
					}
					break;
				case TILE_YELLOW_DOOR_2:
					if(this.yellowKeysHeld > 0){
						this.yellowKeysHeld--;
						roomGrid[walkIntoTileIndex] = TILE_YELLOW_DOOR_2_OPEN;
						doorOpenSound.play();
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
						roomGrid[walkIntoTileIndex] = TILE_BLUE_DOOR_OPEN;
						doorOpenSound.play();
					}
					break;
				case TILE_BLUE_DOOR_2:
					if(this.blueKeysHeld > 0){
						this.blueKeysHeld--;
						roomGrid[walkIntoTileIndex] = TILE_BLUE_DOOR_2_OPEN;
						doorOpenSound.play();
					}
					break;
				case TILE_GREEN_DOOR:
					if(this.greenKeysHeld > 0){
						this.greenKeysHeld--;
						roomGrid[walkIntoTileIndex] = TILE_GREEN_DOOR_OPEN;
						doorOpenSound.play();
					}
					break;
				case TILE_GREEN_DOOR_2:
					if(this.greenKeysHeld > 0){
						this.greenKeysHeld--;
						roomGrid[walkIntoTileIndex] = TILE_GREEN_DOOR_2_OPEN;
						doorOpenSound.play();
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
					console.log("Stair 1");
					loadLevel(levelOne);
					break;
				case TILE_STAIRS:
					console.log("Stair 2");
					loadLevel(levelTwo);
					break;
				case TILE_STAIRS_3:
					console.log("Stair 3");
					loadLevel(levelThree);
					break;			
				case TILE_PITTRAP_ARMED:
					this.takeDamageFromTrap(1);
					roomGrid[walkIntoTileIndex] = TILE_PITTRAP_UNARMED;
					pitTrapSound.play();
					break;
				case TILE_SPIKES_ARMED:
					this.takeDamageFromTrap(1);
					roomGrid[walkIntoTileIndex] = TILE_SPIKES_UNARMED;
					spikeTrapSound.play();
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
						roomGrid[884] = TILE_WALL;
					}
					break;
				case TILE_WALL_LEVER_2:
					if(!this.leverCoolDownActive){
						roomGrid[walkIntoTileIndex] = TILE_WALL_LEVER_1;
						console.log("Walked in Lever 2");
						this.leverCoolDownActive = true;
						roomGrid[884] = TILE_WALL_3;
					}
					break;
				case TILE_WALL:
				case TILE_WALL_WITH_TORCH:
				case TILE_TABLE:
				case TILE_BOOKSHELF:
				default:
					// do not update player position: we are blocked
					break;
			} // END OF SWITCH CASE		
			this.trapCoolDown();
			this.damageCoolDown();
			if(this.leverCoolDownActive){
				this.leverCoolDown++;
				if(this.leverCoolDown == 100){
					this.leverCoolDown = 0;
					this.leverCoolDownActive = false
				}
			}
		}

		// allow attacks to keep going even if the attacker is not longer
		for (let i=0; i < this.myShotList.length; i++){
			let shot = this.myShotList[i];
			if (shot) {
				if (shot.done()) { 
					// TODO: Miss sound plays per frame and needs to play once for attack 
					// missing player and only if close at some point
					// shot.playMissSound();
					shot.reset(); 
				}
				else {
					shot.movement();
					const didHit = entities.some( (entity) => {
						if (entity && entity.alive && entity.takeDamage) {
							if(shot.hitTest(entity) ){
								entity.takeDamage(shot.damageAmount());
								shot.reset();
								return true;
							}
							return false;
						} 
					});
				}

				if(shot.readyToRemove){ this.myShotList.splice(i,1); }
			} 
		}
	};	// END OF THIS.MOVEMENT
		
	this.checkCollisionsAgainst = function(otherHumanoid){
        const COLLISION_PADDING = 10; // give the player a radius
		if(this.collisionTest(otherHumanoid)){
			console.log("warrior bumped into "+otherHumanoid.name);
			const bumpEffect = this.playerMovementSpeed * COLLIDE_BUMP_MULT;
            
            if (this.playerAttacking) {
                console.log("warrior hit "+otherHumanoid.name+" for "+this.swordDamage+" damage!");
                otherHumanoid.takeDamage(this.swordDamage);
            }

			let nextX = this.x;
			let nextY = this.y;

			// if the player is moving, bump player back
			if(this.keyHeld_North){
				this.canMoveNorth = false;
				nextY += bumpEffect;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				nextX -= bumpEffect;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				nextY -= bumpEffect;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				nextX += bumpEffect;
			}	
			const walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
			const walkIntoTileType = roomGrid[walkIntoTileIndex];
			const keepOnSteppin = !(UNWALKABLE_TILES.includes(walkIntoTileType));
			if(keepOnSteppin) {
				this.x = nextX;
				this.y = nextY;
			}
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	};

	this.collisionTest = function(otherHumanoid){
		let wMod = Math.max(20, otherHumanoid.width/2);
		let hMod = Math.max(20, otherHumanoid.height/2);

		if(	otherHumanoid && otherHumanoid.alive &&
			this.x > otherHumanoid.x - wMod && this.x < otherHumanoid.x + wMod &&
			this.y > otherHumanoid.y - hMod && this.y < otherHumanoid.y + hMod){
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		for (let i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}

		if(this.alive){
			if(this.offSetHeight == 0 && !this.playerAttacking){ //player is standing still
				let toAnimatePlayerNumber = getRndInteger(0, 1000);
				if(toAnimatePlayerNumber > 995){
					this.animatePlayerStandingStill = true;
				}
				if(this.animatePlayerStandingStill){
					this.frames = 8;
					this.animateWarrior()
				}
			} else if (this.playerAttacking){ //player not standing still and attacking
				this.myBitmap = warriorAttackingPic;
				this.width = 80;
				this.height = 60;
				this.frames = 2;
				this.offSetHeight = this.offSetHeight - this.height
				this.animateWarrior();
		
			} else { //player is moving and NOT attacking
				this.frames = 3;
				this.animateWarrior();
			}
		} else {
			this.frames = 9;
			this.animateDeath();
		} 

		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(shadowPic,isoDrawX-(this.width/2), isoDrawY-this.height + ISO_SHADOW_OFFSET_Y);
		canvasContext.drawImage(
                this.blockFramesleft > 0 ? warriorBlockingPic : this.myBitmap, 
                this.offSetWidth, this.offSetHeight, this.width, this.height, 
				isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y,
                this.width, this.height);
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

	this.useHealingPotion = function(){
		if(this.healthPotion <= 0){
			console.log("No Health Potions to use");
			return;
		}
		this.healthPotion--;
		this.health = this.health + 2;
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
			this.playerAttacking = false;
			this.width = 40;
			this.height = 40;
			this.myBitmap = warriorPic;
		}
	}

	this.animateDeath = function(){
		this.offSetHeight = 40 * 9;
		this.myBitmap = warriorPic;
		this.width = 40;
		this.height = 40;
		this.frames = 6;

		this.drawTimer++;
		if(this.drawTimer == 16){
			this.offSetWidth = this.offSetWidth + this.width;
			this.drawTimer = 0;
		}
		if(this.offSetWidth > (this.frames * this.width)){
			this.offSetWidth = 40 * 4;		
		}
	}
		
	//this delivers damage to the player when setting off a trap
	this.takeDamageFromTrap = function(howMuchDamage){
		this.takeDamage(howMuchDamage);
	}

	//this delivers damage
	this.takeDamage = function(howMuchDamage){
		if(this.damageCoolDownCounter == 0){
			if (this.blockFramesleft>0) { 
                // we are currently blocking! reduce damage
                howMuchDamage *= BLOCK_DAMAGE_SCALE;
            }
            this.health = this.health - howMuchDamage;
            // debug player health
            console.log("Warrior took "+howMuchDamage+" damage. Current health is "+this.health);
		}
		damageCoolDownTimer = true;
	}
	
	//this is used to keep traps from constantly causing damage to the player
	this.trapCoolDown = function(){
		this.damageCoolDown(TRAP_COOL_DOWN_DELAY);
	}

	//this is used to keep damage from occuring too frequently
	this.damageCoolDown = function(coolDownDelay = DAMAGE_RECEIVED_DELAY){
		if(this.damageCoolDownTimer == true){
			this.damageCoolDownCounter++
		}
		if(this.damageCoolDownCounter == coolDownDelay){
			this.damageCoolDownCounter = 0;
			this.damageCoolDownTimer = false;
		}
	}

    // the way inputs are set up this will fire repeatedly
    this.block = function (){

        if (this.blockFramesleft) {
            // block already in progress: handled in movement()
        } else {
            // start a new block
            console.log("blocking!");
            this.blockFramesleft = BLOCK_FRAME_COUNT;
        }



        // check state in damage function for less damage
        // play a nice sound if a hit gets blocked

    }

    this.swordSwing = function (){
		console.log("Sword Swing");
		for(var i = 0; i < miniCyclopList.length; i++){
			this.checkCollisionsAgainst(miniCyclopList[i]);
		}
		this.swordReady = false;
		this.swordCharge = true;
		this.offSetWidth = 0;
		this.playerAttacking = true;
		//swordSwingSound.play(); // fixme: sound doesn't exist yet
		this.meleeAttack();
	};	

	this.rangedAttack = function(){
		let tempShot = new shotClass(this);
		tempShot.attackFrom(this, true);
		this.rangeAttackRecoveryTimer = true;
	};
		
	this.meleeAttack = function(){
		let tempMeleeHit = new meleeAttackClass(this);
		tempMeleeHit.attackSound = swordSwingSound;
		tempMeleeHit.attackFrom(this, true);
		this.meleeAttackRecoveryTimer = true;
	};

	this.addAttack = function(attack){
		if (attack) {
			this.myShotList.push(attack)
		}
	}
}