const GRID_WEIGHT_INFLUENCE_FACTOR = 50000;
const PATHFINDING_PATH_LIFETIME = 25;
const PATHFINDING_MAX_SEARCH_LOOPS = 250;

orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     

ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];     

class enemyClass {
	x = 600;
	y = 800;
	xv;
	yv;
	width = 40;
	height = 41;
	isoEnemyFootY = 8;
	offSetWidth = 0;
	offSetHeight = 0;
	miniMapX = 630;
	miniMapY = 30;
	
	maxHealth = 2;
	speed = 3;
	randomDirectionSpeed = 2
	health = this.maxHealth;
	
	movementTimer = 0;
	moveNorth = false;
	keyHeld_East = false;
	keyHeld_South = false;
	keyHeld_West = false;
	canMoveNorth = true;
	canMoveEast = true;
	canMoveSouth = true;
	canMoveWest = true;

	animateEnemyStandingStill = false;
	drawTimer = 0;
	frames = 3;

	myShotList = [];
	totalShots = 5;
	canUseRangeAttack = false;
	meleeAttacking = false;

	// shared path data among enemies for performance as long
	// as goal location is the single player
	static pathData = {
		frameCount : 0,
		path : [],
		cost : [],
		lastGoal : null,
	}
	// the last base tile location is specific to each enemy
	pathBase = null;
    pathDir = 0;

	enemyReset() {
		console.log("EnemyClass.enemyReset: "+this.myName);
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
					
	init(whichGraphic, whichName, whichTile) {
		console.log("EnemyClass.init: "+whichName);
        this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.myTile = whichTile;
		this.enemyReset();
	}	
	 
	movement() {
		
		var nextX = this.x; 
		var nextY = this.y; 
        // var collisionY = 0;
		
		// this.randomMovements();
		this.pathfinding();

		this.speed = this.randomDirectionSpeed;
		
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
			// collisionY = nextY;
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
			case TILE_WOOD_DOOR_OPEN:

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
			if(this.canUseRangeAttack){
				this.rangedAttack();
			}
		}

		for (let i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();
		}
	}

	pathfinding() {
		// this.movementTimer--;
		this.movementTimer = 0;
		this.meleeAttacking = false;
		if(this.meleeAttacking) {
			//* Keeping enemy still while testing combat */
			this.speed = 0;
			return;
		} else {
			let pathData = enemyClass.pathData;

			if(this.movementTimer <= 0) {
				const base = getTileCoordAtPixelCoord(this.x, this.y);
				const goal = getTileCoordAtPixelCoord(playerOne.x, playerOne.y);

				if (!base || !goal) {
					console.log("pathfinding(): base and goal not found");
					return;
				}

				// last base is an instance property and 
				// last goal is a class property 
				// while the base will change among instances, 
				// the goal is to be playerOne may not have moved
				if (!this.pathBase) { this.pathBase = base; }
				if (!pathData.lastGoal) { pathData.lastGoal = goal; }

				const baseHasMoved = 
					base.tileCol != this.pathBase.tileCol ||
					base.tileRow != this.pathBase.tileRow;

				const goalHasMoved =
					goal.tileCol != pathData.lastGoal.tileCol ||
					goal.tileRow != pathData.lastGoal.tileRow;

				this.pathBase = base;
				pathData.lastGoal = goal;

				const baseIndex = rowColToArrayIndex(base.tileCol, base.tileRow);

				const resetPath = 
					// if frame lifetime has passed
					pathData.frameCount 
						% PATHFINDING_PATH_LIFETIME === 0 ||
					// if goal has moved
					baseHasMoved ||
					// if goal has moved
					goalHasMoved ||
					// if path is empty
					pathData.path.length === 0 ||
					// if cost is empty
					pathData.cost.length === 0;

				// see if base location is missing from path
				const appendPath = 
					pathData.path.length > 0 && !pathData.path[baseIndex];

				// use the pathfinding if we need path from base to goal or every few frames
				if (resetPath || appendPath) {
					pathData.frameCount = 0;

					const astarResults = aStarSearch(roomGrid, base, goal);

					// append on any new paths towards the current goal
					if (resetPath && !appendPath) {
						pathData.path = astarResults.path;
						pathData.cost = astarResults.cost;
					} else {
						pathData.path = 
							pathData.path.map((item , index ) => 
								!item ? astarResults.path[index] : item
							);
						pathData.cost = 
							pathData.cost.map((item , index ) => 
								!item ? astarResults.cost[index] : item
							);
					}
				
					// get the unit vector from the base to the next tile
					const nextIndex = !pathData.path[baseIndex] ? baseIndex : pathData.path[baseIndex];

					const nextTileCol = Math.floor(nextIndex % ROOM_COLS);
					const nextTileRow = Math.floor(nextIndex / ROOM_COLS);
	
					const pathVector = {
						tileCol: nextTileCol - base.tileCol,
						tileRow: nextTileRow - base.tileRow
					};
	
					const magnitude = 
						Math.sqrt(pathVector.tileCol ** 2 + pathVector.tileRow ** 2);

					const unitVector = { 
						tileCol : 
					    	Math.round(pathVector.tileCol / magnitude),
						tileRow : 
							Math.round(pathVector.tileRow / magnitude),
					}
	
					// get the direction
					const unitVectorOptions = [
						// move d to the front of each object in the array
						{ dir: 1, tileCol: 0, tileRow: -1 },
						{ dir: 2, tileCol: -1, tileRow: -1 },
						{ dir: 3, tileCol: -1, tileRow: 0 },
						{ dir: 4, tileCol: -1, tileRow: 1 },
						{ dir: 5, tileCol: 0, tileRow: 1 },
						{ dir: 6, tileCol: 1, tileRow: 1 },
						{ dir: 7, tileCol: 1, tileRow: 0 },
						{ dir: 8, tileCol: 1, tileRow: -1 },
						{ dir: 9, tileCol: 0, tileRow: 0 },
					];
	
					const whichUnitVectorMatch = 
						unitVectorOptions.find(( { tileCol, tileRow } ) => 
							tileCol === unitVector.tileCol && tileRow === unitVector.tileRow 
						);
	
					if (!whichUnitVectorMatch) {
						console.log("path not found");
						return;
					}

					this.pathDir = whichUnitVectorMatch.dir;
				}

				pathData.frameCount++;

				this.resetDirections();
				this.movementTimer = 300;

				switch(this.pathDir) {
				case 0:
				case 1:
					this.moveNorth = true;					
					break;
				case 2:
					this.moveNorth = true;
					this.moveWest = true;					
					break;
				case 3:
					this.moveWest = true;
					break;
				case 4:
					this.moveWest = true;
					this.moveSouth = true;
					break;
				case 5:
					this.moveSouth = true;
					break;
				case 6:
					this.moveSouth = true;
					this.moveEast = true;
					break;
				case 7:
					this.moveEast = true;
					break;
				case 8:
					this.moveNorth = true;
					this.moveEast = true;					
					break;
				case 9:
				case 10:
				default:
					break;
				}
			}
		}
	}

	randomMovements(){
		var whichDirection = Math.round(Math.random() * 10);        //* Keeping enemy still while testing combat */
		this.movementTimer--;
		if(this.meleeAttacking){
			this.speed = 0;
			return;
		} else {
				if(this.movementTimer <= 0){
				switch(whichDirection){
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
					//	break;
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
					//	break;
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
					//	break;
					case 7:
						this.resetDirections();
						this.moveEast = true;
						this.movementTimer = 300;
						break;
					case 8:
						this.resetDirections();
						this.moveNorth = true;
						this.moveEast = true;					
						this.movementTimer = 300;
					//	break;
					case 9:
					case 10:
						this.resetDirections();
						this.movementTimer = 300;
						break;
				}
			}
		}
	};
	
	resetDirections(){
		this.moveNorth = false;
		this.moveWest = false;
		this.moveSouth = false;
		this.moveEast = false;
	}	
	
	checkCollisionsAgainst(otherHumanoid){
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
	
	collisionTest(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}

	rangedAttack(){
		crashIntoConeSound.play();

//		if(this.myShotList.length < this.totalShots){
			let tempShot = new shotClass();
			tempShot.shootFrom(this);
			this.myShotList.push(tempShot);
//		} 
	}

	checkForMeleeCombatRange(){
		let playerTile = getTileIndexAtPixelCoord(playerOne.x,playerOne.y);
		let enemyTile = getTileIndexAtPixelCoord(this.x,this.y)
		
		if (playerTile == enemyTile - ROOM_COLS - 1){
			console.log("player N, attack");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 5;
			swordSwing2Sound.play();		
		} else if(playerTile == enemyTile - 1){
			console.log("player NW, attack");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 6;
			swordSwing2Sound.play();
		} else if(playerTile == enemyTile + ROOM_COLS - 1){
			console.log("player W, attack");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 7; 
			swordSwing2Sound.play();
		} else if (playerTile == enemyTile + ROOM_COLS){
			console.log("player SW, attack ");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 8;
			swordSwing2Sound.play();
		} else if (playerTile == enemyTile + ROOM_COLS + 1){
			console.log("player S, attack ");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 1;
			swordSwing2Sound.play();
		} else if (playerTile == enemyTile + 1){
			console.log("player SE, attack");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 2;
			swordSwing2Sound.play();
		} else if (playerTile == enemyTile - ROOM_COLS + 1){
			console.log("player E, attack ");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 3;
			swordSwing2Sound.play();
		} else if (playerTile == enemyTile - ROOM_COLS){
			console.log("player NE, attack ");
			this.meleeAttacking = true;
			this.speed = 0;
			this.offSetHeight = this.height * 4;
			swordSwing2Sound.play();
		} else {
			this.meleeAttacking = false;
		}
	}
		
	draw(){
		for (let i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}

		if(this.offSetHeight == 0){ //enemy is standing still
			let toAnimateEnemyNumber = getRndInteger(0, 1000);
			if(toAnimateEnemyNumber > 995){
				this.animateEnemyStandingStill = true;
			}
			if(this.animateEnemyStandingStill){
				this.frames = 7;
				this.animateEnemy()
			}
		} else { //enemy is moving
			this.frames = 3;
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

	animateEnemy(){
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
