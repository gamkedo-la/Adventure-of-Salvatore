//characters (Player, NPC's, Enemies)
var playerOne = new warriorClass();
var miniCyclopList = [];
var rogueList = [];
var blobList = [];
var skeletonList = [];
var kregList = [];
var entities = [playerOne];

function resetEnemyLists(){
	miniCyclopList = [];
	skeletonList = [];
	rogueList = [];
	blobList = [];
	entities = [playerOne];
}

window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();	
	
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.warriorReset();
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	loadLevel(levelOne)
	playerOne.init(warriorPic, "The Warrior");

    /* 
    // this is all already done in loadLevel function
    for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_MINICYCLOP){
			addMiniCyclop();
		}
		if(roomGrid[i] == TILE_BLOB){
			addBlob();
		} 
		if(roomGrid[i] == TILE_SKELETON){
			addSkeleton();
		}
	}
	console.log("initializing "+miniCyclopList.length+" minicyclopses (AGAIN)");
    for(var i = 0; i < miniCyclopList.length; i++){
		miniCyclopList[i].init(miniCyclopPic, miniCyclopNames[i], TILE_MINICYCLOP);
	}
	console.log("initializing "+blobList.length+" blobs (AGAIN)");
	for(var i = 0; i < blobList.length; i++){
		blobList[i].init(blobPic, blobNames[i], TILE_BLOB);
	}
	console.log("initializing "+skeletonList.length+" skeletons (AGAIN)");
	for(var i = 0; i < skeletonList.length; i++){
		skeletonList[i].init(skeletonPic, skeletonNames[i], TILE_SKELETON);
	}
    */

	mainBackgroundMusic.loopSong("salvatore");

	setInterval(function() {
		if (!pauseScreen) {
			moveEverything();
			checkAllPlayerAndEnemyCollisions();
		}
		drawEverything();
	}, 1000/framesPerSecond);
}

//Adds an enemy 
function addMiniCyclop(){
    var tempEnemy = new MiniCyclop();
	miniCyclopList.push(tempEnemy);
	entities.push(tempEnemy);
}

function addRogue(){
    var tempEnemy = new rogue();
	rogueList.push(tempEnemy);
	entities.push(tempEnemy);
}

function addBlob(){
	var tempEnemy = new blobClass();
	blobList.push(tempEnemy);
	entities.push(tempEnemy);
}

function addSkeleton(){
	var tempEnemy = new skeletonClass();
	skeletonList.push(tempEnemy);
	entities.push(tempEnemy);
}

function addKreg(){
	var tempEnemy = new kregClass();
	kregList.push(tempEnemy);
	entities.push(tempEnemy);
}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	resetEnemyLists();
	roomGrid = whichLevel.slice();
	playerOne.warriorReset();
	
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_MINICYCLOP){
			addMiniCyclop();
		}
		if(roomGrid[i] == TILE_ROGUE){
			addRogue();
		} 
		if(roomGrid[i] == TILE_BLOB){
			addBlob();
		}
		if(roomGrid[i] == TILE_SKELETON){
			addSkeleton();
		}
		if(roomGrid[i] == TILE_KREG){
			addKreg();
		}
	}

    console.log('testing OOP!');
    console.log(miniCyclopList);
    console.log("type of the first enemy: "+(typeof miniCyclopList[0]));

    console.log("initializing "+miniCyclopList.length+" minicyclopses via loadlevel");
    for(var i = 0; i < miniCyclopList.length; i++){
		miniCyclopList[i].init(miniCyclopPic, miniCyclopNames[i], TILE_MINICYCLOP);
	}
	console.log("initializing "+blobList.length+" blobs via loadlevel");
    for(var i = 0; i < blobList.length; i++){
		blobList[i].init(blobPic, blobNames[i], TILE_BLOB);
	}
	console.log("initializing "+skeletonList.length+" skeletons via loadlevel");
	for(var i = 0; i < skeletonList.length; i++){
		skeletonList[i].init(skeletonPic, skeletonNames[i], TILE_SKELETON);
	}
	for(var i = 0; i < rogueList.length; i++){
		rogueList[i].init(roguePic, rogueNames[i], TILE_ROGUE);
	}
	for(var i = 0; i < kregList.length; i++){
		kregList[i].init(kregPic, kregNames[i], TILE_KREG);
	}

	console.log("Finish Load Level");
}
			
//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		for(var i = 0; i < entities.length; i++){
			entities[i].movement();
		}
		for(var i = 0; i < smokeList.length; i++){
			smokeList[i].move();
		}
		removeBulletFromList();
		removeSmokeFromList();
		if(MousePosY > 500){
			checkGUIMousePos();
		}
        MouseJustClicked = false; // we handled it above IF required - reset for next frame
		updatedCameraPosition();
	}
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions(){
	//check Mini Cyclops
	for(var i = 0; i < miniCyclopList.length; i++){
		playerOne.checkCollisionsAgainst(miniCyclopList[i]);
		for(var ii = i+1; ii < miniCyclopList.length; ii++){
			miniCyclopList[i].checkCollisionsAgainst(miniCyclopList[ii]);
			miniCyclopList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check Rogue
	for(var i = 0; i < rogueList.length; i++){
		playerOne.checkCollisionsAgainst(rogueList[i]);
		for(var ii = i+1; ii < rogueList.length; ii++){
			rogueList[i].checkCollisionsAgainst(rogueList[ii]);
			rogueList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check Kreg
	for(var i = 0; i < kregList.length; i++){
		playerOne.checkCollisionsAgainst(kregList[i]);
		for(var ii = i+1; ii < kregList.length; ii++){
			kregList[i].checkCollisionsAgainst(kregList[ii]);
			kregList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check Blobs
	for(var i = 0; i < blobList.length; i++){
		playerOne.checkCollisionsAgainst(blobList[i]);
		for(var ii = i+1; ii < blobList.length; ii++){
			blobList[i].checkCollisionsAgainst(blobList[ii]);
			blobList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check Blobs
	for(var i = 0; i < skeletonList.length; i++){
		playerOne.checkCollisionsAgainst(skeletonList[i]);
		for(var ii = i+1; ii < skeletonList.length; ii++){
			skeletonList[i].checkCollisionsAgainst(skeletonList[ii]);
			skeletonList[i].checkCollisionsAgainst(playerOne);
		}
	}
	//check wallTrap
	for(var i = 0; i < rockBulletList.length; i++){
		playerOne.checkCollisionsAgainst(rockBulletList[i]);
		for(var ii = i+1; ii < rockBulletList.length; ii++){
			rockBulletList[i].checkCollisionsAgainst(rockBulletList[ii]);
			rockBulletList[i].checkCollisionsAgainst(playerOne);
		}
	} 
}

function zSort(anArrayOfEntities) {

    for (var i = 0; i < anArrayOfEntities.length; i++) {
        anArrayOfEntities[i].zsort = anArrayOfEntities[i].x/ISO_TILE_DRAW_W + anArrayOfEntities[i].y/ISO_TILE_DRAW_H;
    }

    anArrayOfEntities.sort(function(a, b) {
        return a.zsort - b.zsort;
    });

}

function drawIsometricWorld() {
    // Draw isometric back to front, with creatures
    var maxLength = Math.max(ROOM_ROWS, ROOM_COLS)
    var entityIndex = 0;
    sharedAnimCycle++;
    for (var z = 0; z < maxLength; z++) {
        var row = 0;
        var col = z;
        while (col >= 0) {
            drawAt(row, col);
            row++;
            col--;
        }
        while (entityIndex < entities.length && entities[entityIndex].zsort < z+1.5) {
            entities[entityIndex].draw();
            entityIndex++;
        }
    }
	
    for (var z = 0; z < maxLength; z++) {
        var row = z;
        var col = maxLength;
        while (col >= z) {
            drawAt(row, col);
            row++;
            col--;
        }
        while (entityIndex < entities.length && entities[entityIndex].zsort < z+maxLength+1.5) {
            entities[entityIndex].draw();
            entityIndex++;
        }
    }
    // Draw any remaining creaturs
    while (entityIndex < entities.length) {
        entities[entityIndex].draw();
        entityIndex++;
    }
    for(var i = 0; i < rockBulletList.length; i++){
        rockBulletList[i].draw();
        removeBulletFromList();
    }
    for(var i = 0; i < smokeList.length; i++){
        smokeList[i].draw();
        removeSmokeFromList();
    }
    
    // finally, draw the player again on TOP of any walls (x-ray)
    
    // TODO: use this blendmode to only draw pixels where walls are:
    // canvasContext. globalCompositeOperation = "source-in";
    // this requires two canvases, one for floor, one for walls
    // for a better blue outline x-ray effect

    if (XRAY_VISION_ENABLED) {
        canvasContext.globalAlpha = XRAY_VISION_OPACITY;
        playerOne.draw();
        canvasContext.globalAlpha = 1; // reset so we don't trash the next draw call
    }

}

function drawScreenBorder() {
    // darken the edges of the screen
    canvasContext.globalAlpha = VIGNETTE_BORDER_OPACITY;
    canvasContext.drawImage(vignetteBorderPic,0,0);
    canvasContext.globalAlpha = 1;
}


//All movement occurs here.  This is called every frame.
function drawEverything() {

    colorRect(0,0,canvas.width,canvas.height, 'black');

    if(liveGame){
		shiftForCameraPan();
		drawWorldBackground();
		drawFloor();
        zSort(entities);
        drawIsometricWorld();
		finishedCameraPan();
        drawScreenBorder();
        drawUserInterface();
        drawMinimap();
        if (worldMapCurrentlyVisible) drawWorldMap();
    }

    if(itemScreen){
		itemScreenDisplay();
		drawUserInterface();
	}

}
