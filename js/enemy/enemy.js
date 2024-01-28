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
	moveSouth = false;
	moveEast = false;
	moveWest = false;
	// keyHeld_East = false;
	// keyHeld_South = false;
	// keyHeld_West = false;
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
		frame : 0,
		path : [],
		cost : [],
		goal : null,
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

		// if no path is found that enemy can wander around
		if (this.pathfinding()) { 
			// console.log(this.myName, "is following a path");
		} else {
			// console.log(this.myName, "is taking a random walk");
			this.randomMovements(); 
		}

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
			case TILE_WOOD_DOOR_2_OPEN:
			case TILE_YELLOW_DOOR_OPEN:
			case TILE_YELLOW_DOOR_2_OPEN:
			case TILE_BLUE_DOOR_OPEN:
			case TILE_BLUE_DOOR_2_OPEN:
			case TILE_GREEN_DOOR_OPEN:
			case TILE_GREEN_DOOR_2_OPEN:
			case TILE_RED_DOOR_OPEN:
			case TILE_RED_CARPET:
			case TILE_SPIKES_UNARMED:	
			case TILE_PITTRAP_UNARMED:
			case TILE_TREASURE:	
			case TILE_KEY_YELLOW:	
			case TILE_KEY_BLUE:	
			case TILE_KEY_GREEN:	
			case TILE_KEY_RED:
			case TILE_HEALING_POTION:
			case TILE_SPEED_POTION:
			case TILE_COIN:
			case TILE_WALL_LEVER_1:
			case TILE_WALL_LEVER_2:
				this.x = nextX;
				this.y = nextY;
				break;					
			// case TILE_WALL:
			// case TILE_SPIKES_ARMED:
			// case TILE_SPIKES_UNARMED:
			// case TILE_PITTRAP_ARMED:
			// case TILE_PITTRAP_UNARMED:
			// case TILE_TREASURE:
			// case TILE_FINISH:			
			// case TILE_YELLOW_DOOR:
			// case TILE_RED_DOOR:
			// case TILE_BLUE_DOOR:
			// case TILE_TABLE:
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
		// returns true if pathfinding is in progress and a direction taken
		// returns false if pathfinding is not in progress
		this.movementTimer--;
		this.meleeAttacking = false;
		if(this.meleeAttacking) {
			//* Keeping enemy still while testing combat */
			this.speed = 0;
			return true;
		} else {
			if(this.movementTimer <= 0) {
				let pathData = enemyClass.pathData;

				const base = getTileCoordAtPixelCoord(this.x, this.y);
				const goal = getTileCoordAtPixelCoord(playerOne.x, playerOne.y);

				if (!base || !goal) {
					console.log("pathfinding(): base and goal not found");
					return false;
				}

				// last base is an instance property and 
				// last goal is a class property 
				// while the base will change among instances, 
				// the goal is to be playerOne may not have moved
				if (!this.pathBase) { this.pathBase = base; }
				if (!pathData.goal) { pathData.goal = goal; }

				// const baseHasMoved = 
				// 	base.tileCol != this.pathBase.tileCol ||
				// 	base.tileRow != this.pathBase.tileRow;
				const goalHasMoved = 
					goal.tileCol != pathData.goal.tileCol ||
					goal.tileRow != pathData.goal.tileRow;

				this.pathBase = base;
				pathData.goal = goal;
	
				const baseIndex = rowColToArrayIndex(base.tileCol, base.tileRow);

				const resetFrame = pathData.frame % PATHFINDING_PATH_LIFETIME === 0;
				const pathIsEmpty = pathData.path.length === 0;
				const costIsEmpty = pathData.cost.length === 0;
				const baseNotInPath = !pathData.path[baseIndex];

				const resetPathData = 
					// if frame lifetime has passed
					resetFrame ||
					// if goal has moved to tile not in path
					goalHasMoved ||
					// if path array is empty
					pathIsEmpty ||
					// if cost array is empty
					costIsEmpty;

				// see if base location is missing from path
				const appendPathData = 
					// enemy has moved to tile not in path
					baseNotInPath;

				// renew pathfinding if we need path from base to goal or every few frames
				if (resetPathData || appendPathData) {
					pathData.frame = 0;

					const astarResults = aStarSearch(roomGrid, base, goal);

					if (resetPathData) {
						// reset the path and cost
						pathData.path = astarResults.path;
						pathData.cost = astarResults.cost;
					} else {
						// append on any new paths towards the current goal
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
					const nextTileCoord = getTileCoordAtTileIndex(nextIndex);
					const pathVector = {
						tileCol: nextTileCoord.tileCol - base.tileCol,
						tileRow: nextTileCoord.tileRow - base.tileRow
					};
	
					const magnitude = 
						Math.sqrt(pathVector.tileCol ** 2 + pathVector.tileRow ** 2);

					const unitVector = { 
						tileCol : 
							magnitude > 0 ? Math.round(pathVector.tileCol / magnitude) : 0,
						tileRow : 
							magnitude > 0 ? Math.round(pathVector.tileRow / magnitude) : 0,
					}
	
					const direction = 
						directionOptions.find( ( dir ) =>
							dir.move(unitVector.tileCol, unitVector.tileRow)
						);

					if (direction) {
						this.pathDir = direction;
					} else {
						console.log("path not found");
						return false;
					}
				}

				if (this.pathDir) {
					pathData.frame++;
					this.movementTimer = 2;
					this.resetDirections();
	
					// move in the path's direction towards goal
					this.moveNorth = this.pathDir.moveNorth;
					this.moveEast = this.pathDir.moveEast;
					this.moveSouth = this.pathDir.moveSouth;
					this.moveWest = this.pathDir.moveWest;

					return true;
				} else {
					return false;
				}
			} else {
				return true;
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
					this.resetDirections();
					this.movementTimer = 
						Math.floor(Math.random() * RANDOM_MOVEMENT_TIMER_MAX);
					switch(whichDirection){
					case 0:
					case DIR_N:
						this.moveNorth = true;					
						break;
					// Changed and re-commented out non-animated movement until ready 
					// Disabled non-animated for now. -- Vince McKeown 
					// case DIR_NE:
					// 	this.moveNorth = true;
					// 	this.moveEast = true;					
					// 	break;
					case DIR_E:
						this.moveEast = true;
						break;
					// Changed and re-commented out non-animated movement until ready 
					// Disabled non-animated for now. -- Vince McKeown 
					// case DIR_SE:
					// 	this.moveSouth = true;
					// 	this.moveEast = true;
					// 	break;
					case DIR_S:
						this.moveSouth = true;
						break;
					// Changed and re-commented out non-animated movement until ready 
					// Disabled non-animated for now. -- Vince McKeown 
					// case DIR_SW:
					// 	this.moveWest = true;
					// 	this.moveSouth = true;
					// 	break;
					case DIR_W:
						this.moveWest = true;
						break;
					// Disabled non-animated for now. -- Vince McKeown 
					// case DIR_NW:
					// 	this.moveNorth = true;
					// 	this.moveWest = true;					
					// 	break;
					case DIR_NO:
					default:
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

        // display intended path
        this.drawPath();
	}

	// work in progress - does not function
    drawPath() {
        return;
        
        if (!enemyClass.pathData) return;
        if (!enemyClass.pathData.path) return;
        if (enemyClass.pathData.path[0] == -1) return; // strange
        // hmm - code never reaches past the above FIXME

        // hmm WHY do multiple enemies share a path? they are in different locations? 
        // FIXME this feels wrong
        let mypath = enemyClass.pathData.path;
        console.log("drawing an enemy path!");
        for (let i=0; i<mypath.length; i++) {
            // what a strange way to calculate isometric coords!
            let mapindex = mypath[i];
            let tx = Math.floor(mapindex % ROOM_COLS);
			let ty = Math.floor(mapindex / ROOM_COLS);
            tileCoordToIsoCoord(tx, ty);
			let px = isoDrawX;//-ISO_GRID_W/2; // huh??
            let py = isoDrawY;//-ISO_TILE_GROUND_Y;
            colorRect(px, py, px+2, py+2, "magenta"); // draw a dot
            //console.log("- path dot at "+px+","+py);
        }
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
