const GRID_WEIGHT_INFLUENCE_FACTOR = 500;

orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     

ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];     


function enemyClass() {
	this.x = 600;
	this.y = 800;
	this.xv;
	this.yv;
	this.width = 40;
	this.height = 40;
	this.isoEnemyFootY = 8;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	
	this.maxHealth = 2;
	this.speed = 3;
	this.randomDirectionSpeed = 2
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
	this.frames = 3;

	this.myShotList = [];
	this.totalShots = 5;
	this.canUseRangeAttack = false;
	this.meleeAttacking = false;
	
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
		// this.pathfinding();

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
			if(this.canUseRangeAttack){
				this.rangedAttack();
			}
		}

		for (i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();
		}
	};

	function a_star_search(gridArray, base, goal) {
		// Using the following as a reference
		// https://www.redblobgames.com/pathfinding/a-star/implementation.html
		// Differences from Dijkstra's and A* can be found in the "Algorithm Changes" section
		// https://www.redblobgames.com/pathfinding/a-star/implementation.html#algorithm
		function heuristic( {x1, y1}, {x2, y2} ) {
			return Math.abs(x1 - x2) + Math.abs(y1 - y2); // Manhattan distance
		}
		class PriorityQueue {
			#data = [];

			#prioritize(i, j) {
				i.priority - j.priority;
			}

			join(element, priority) {
				this.#data.push({element, priority});
			}

			pick() {
				this.#data.sort(this.#prioritize);
				return this.#data.pop().element;
			}

			empty() {
				return this.#data.length == 0;
			}
		}

		frontier = new PriorityQueue();
		frontier.join(base, 0);
		pathToHere = {};
		costToHere = {};
		pathToHere[base] = null;
		costToHere[base] = 0;

		while (!frontier.empty()) {
			let current = frontier.pick();

			if (current == goal) { break; }

			let neighbors = [
				n = { tileRow : current.tileRow - 1, tileCol : current.tileCol },
				s = { tileRow : current.tileRow + 1, tileCol : current.tileCol },
				e = { tileRow : current.tileRow, tileCol : current.tileCol + 1 },
				w = { tileRol : current.tileRow, tileCol : current.tileCol - 1 }
			];

			for (let next of neighbors) {
				const nextIndex = next.tileRow * ROOM_COLS + next.tileCol;
				const newCost = costToHere[current] + gridArray[nextIndex] * GRID_WEIGHT_INFLUENCE_FACTOR;

				// Making this faster by not checking for location and, further,
				// not checking the new cost is less than the existing for the
				// location.
				// if (!costToHere.hasOwnProperty(next) || newCost < costToHere[next]) {}
				costToHere[next] = newCost;
				pathToHere[next] = current;
				const priority = newCost + heuristic(next, goal);
				frontier.join(next, priority);
			}
		}

		return [pathToHere, costToHere];
	}

	this.pathfinding = function() {
		base = { x : this.x, y : this.y };
		goal = { x : playerOne.x, y : playerOne.y };

		let [path, cost] = a_star_search(roomGrid, base, goal);
		console.log("path, cost:", path, cost);
		
		let { dx, dy } = path[0] - base;
		// get the unit vector
		let magnitude = Math.sqrt(dx * dx + dy * dy);
		let unitVector = { x : dx / magnitude, y : dy / magnitude };
		// get the direction

		const unitVectorOptions = [
			// move d to the front of each object in the array
			{ d: 1, x: 0, y: -1 },
			{ d: 2, x: -1, y: -1 },
			{ d: 3, x: -1, y: 0 },
			{ d: 4, x: -1, y: 1 },
			{ d: 5, x: 0, y: 1 },
			{ d: 6, x: 1, y: 1 },
			{ d: 7, x: 1, y: 0 },
			{ d: 8, x: 1, y: -1 },
		];

		const whichDirection = unitVectorOptions.find( ( { x, y } ) => x == unitVector.x && y == unitVector.y ).d;

		this.movementTimer--;
		if(this.meleeAttacking){
			//* Keeping enemy still while testing combat */
			this.speed = 0;
			return;
		} else {
			if(this.movementTimer <= 0){
				this.resetDirections();
				this.movementTimer = 300;

				switch(whichDirection){
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
					break;
				}
			}
		}
	}

	this.randomMovements = function(){
		var whichDirection = Math.round(Math.random() * 10);        //* Keeping enemy still while testing combat */
		this.movementTimer--;
		if(this.meleeAttacking){
			this.speed = 0;
			return;
		} else {
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
		crashIntoConeSound.play();

//		if(this.myShotList.length < this.totalShots){
			let tempShot = new shotClass();
			tempShot.shootFrom(this);
			this.myShotList.push(tempShot);
//		} 
	}

	this.checkForMeleeCombatRange = function(){
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
