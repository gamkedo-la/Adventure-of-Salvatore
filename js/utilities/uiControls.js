function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});
	
	document.addEventListener('mousedown', function(evt) {
        // silly hack - if map is visible, ANY click anywhere closes it
        //if (worldMapCurrentlyVisible) worldMapCurrentlyVisible = false;
        MouseJustClicked = !MouseIsHeldDown;
        MouseIsHeldDown = true;
	});

	document.addEventListener('mouseup', function(evt) {
        MouseIsHeldDown = false;
	});

    document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SPACEBAR,
        KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_X,
        KEY_E,KEY_F,KEY_C,KEY_LEFTSHIFT);
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, playerOne, true);
	evt.preventDefault();
	
	var paused = KEY_P;
	var menuKey = KEY_M;
	var mapKey = KEY_N;
	var itemKey = KEY_I;
	var muteKey = KEY_B;
	//var addRockBulletKey = KEY_SPACEBAR; // just for troubleshooting wall trap 
	var speedPotion = KEY_1;
	var healingPotion = KEY_2;
	var startGame = KEY_SPACEBAR;

	if(!liveGame){
		if(startGame = evt.keyCode){
			liveGame = true;
		}
	} 

	if(paused == evt.keyCode){
		changePauseState();
	} else if (muteKey == evt.keyCode){
		isMuted = !isMuted;
	} else if (speedPotion == evt.keyCode){
		playerOne.useSpeedPotion();
	} else if (healingPotion == evt.keyCode){
		playerOne.useHealingPotion();
	} else if (menuKey == evt.keyCode){
		console.log("Go to Menu Screen");
	} else if (mapKey == evt.keyCode){
		console.log("MAP keypress - Toggle Map on/off");
        worldMapCurrentlyVisible = !worldMapCurrentlyVisible;
	} else if (itemKey == evt.keyCode){
		itemScreen = !itemScreen;
		liveGame = !liveGame;
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, playerOne, false);
}

function setKeyHoldState(thisKey, thisWarrior, setTo) {
	
	document.getElementById("debugText").innerHTML = "Key: " +thisKey;

	if (!pauseScreen || !setTo) {
		// !setTo allowed through to do a key release during pause state
		if(thisKey == thisWarrior.controlKeyForNorth ||
            thisKey == thisWarrior.controlKeyForNorth2
            ){
			thisWarrior.keyHeld_North = setTo;
		}
		if(thisKey == thisWarrior.controlKeyForEast ||
            thisKey == thisWarrior.controlKeyForEast2){
			thisWarrior.keyHeld_East = setTo;
		}
		if(thisKey == thisWarrior.controlKeyForSouth ||
            thisKey == thisWarrior.controlKeyForSouth2){
			thisWarrior.keyHeld_South = setTo;
		}
		
		if(thisKey == thisWarrior.controlKeyForWest ||
            thisKey == thisWarrior.controlKeyForWest2){
			thisWarrior.keyHeld_West = setTo;
		}
	
		if(thisKey == thisWarrior.controlKeyForSwordSwing ||
            thisKey == thisWarrior.controlKeyForSwordSwing2){
			if(playerOne.swordReady){
				playerOne.swordSwing();
			}
		}

        // block
		if(thisKey == thisWarrior.controlKeyForBlock1
            || thisKey == thisWarrior.controlKeyForBlock2
            || thisKey == thisWarrior.controlKeyForBlock3
            || thisKey == thisWarrior.controlKeyForBlock4
            ){
            playerOne.block(); // this gets called a lot. maybe !setTo would help?
		}        


	}
}

function changePauseState(){
	if(pauseScreen){
		pauseScreen = false;
		console.log("Pause");
	} else {
		pauseScreen = true;
		console.log("Unpause");
	}	
}

// NOTE: this gets called EVERY FRAME - not just after a click
// FIXME: these X,Y values are incorrect and do not match the artwork
function checkGUIMousePos(){
	
    //console.log("MousePos X:"+MousePosX+" Y:"+MousePosY);
    
    let box1X = 20;
	let box1Y = 525;
	let box1Width = 100;
	let box1Height = 35;
	if (MousePosX > box1X && MousePosX < box1X + box1Width &&
		MousePosY > box1Y && MousePosY < box1Y + box1Height){
            // if (MouseJustClicked) { click action }
            console.log("Hovering the Menu Button");
		
	};
	let box2X = 20;
	let box2Y = 561;
	let box2Width = 100;
	let box2Height = 35;
	if (MousePosX > box2X && MousePosX < box2X + box2Width &&
		MousePosY > box2Y && MousePosY < box2Y + box2Height){
			// if (MouseJustClicked) { click action }
			console.log("Hovering Items Button");
		
	};
	let box3X = 680;
	let box3Y = 500;
	let box3Width = 100;
	let box3Height = 35;
	if (MousePosX > box3X && MousePosX < box3X + box3Width &&
		MousePosY > box3Y && MousePosY < box3Y + box3Height){
            if (MouseJustClicked) {
                console.log("MAP button clicked.");
                worldMapCurrentlyVisible = !worldMapCurrentlyVisible;
            } else {
			    console.log("Hovering the Map Button");
            }
	};
}

function drawUserInterface(){
	canvasContext.drawImage(guiBorderPic,0,0);
	canvasContext.drawImage(guiButtonPic,20,525);
	colorText("MENU", 40, 547, 'white', '18px serif');
	canvasContext.drawImage(guiButtonPic,20,561);
	colorText("ITEMS", 40, 583, 'white', '18px serif');
	canvasContext.drawImage(guiButtonPic,canvas.width - 120,525);
	colorText("MAP", canvas.width - 90, 547, 'white', '18px serif');
	canvasContext.drawImage(feedbackGUIPic,canvas.width - 335,538);
	colorText(feedbacktoPlayerLine1, canvas.width - 315, 555, 'BLACK', '12px serif');
	colorText(feedbacktoPlayerLine2, canvas.width - 315, 575, 'BLACK', '12px serif');
	
	let startX = 150
	let startY = 561
	let amountOfHolders = 6;
	let holderSpot = 0
	let holderSpacing = 50;
	for(holderSpot; holderSpot < amountOfHolders; holderSpot++){
		canvasContext.drawImage(guiPotionHolderPic, startX + (holderSpot * holderSpacing), startY);
		if(playerOne.speedPotion > 0){
			canvasContext.drawImage(trackPics[TILE_SPEED_POTION], 0,50,50,50,140, 555,50,50);
			if(playerOne.speedPotion > 1){
			colorText("x" + playerOne.speedPotion, 168, 575, 'green', '10px serif');
			}
		}
		if(playerOne.healthPotion > 0){
			canvasContext.drawImage(trackPics[TILE_HEALING_POTION], 0,50,50,50,190, 555,50,50);
			if(playerOne.healingPotion > 1){
				colorText("x" + playerOne.healthPotion, 217, 575, 'green', '10px serif');
			}
		}
		colorText(holderSpot + 1, startX + (holderSpot * holderSpacing) + 22, startY + 28, 'white', '12px serif');
	}

	let healthBarHolderX = startX
	let healthBarHolderY = 540;
	let healthX = startX + 20;
	canvasContext.drawImage(healthbarPic, healthBarHolderX,healthBarHolderY);
	for(var i = 0; i < playerOne.health; i++){
		canvasContext.drawImage(healthPic, healthBarHolderX +25 + (i*9),healthBarHolderY);
	}
	canvasContext.drawImage(coinGUIPic, canvas.width - 120,561);
	colorText(playerOne.coins, canvas.width - 60, 585, 'white', '16px serif');
	if(displayQuickKeysOn){
		displayQuickKeys()
	};
}

function displayQuickKeys(){
	displayQuickKeysTimer--;
	//console.log("display")
	if(displayQuickKeysTimer <= 0){
		displayQuickKeysOn = false;
		displayQuickKeysTimer = 50;
	}
	colorRect(15, 532, 20, 20, 'white');
	colorText("M",17,547,"black", '16px serif');
	colorRect(15, 570, 20, 20, 'white');
	colorText("I",23,585,"black", '16px serif');
	colorRect(687, 532, 20, 20, 'white');
	colorText("N",691,547,"black", '16px serif');

	canvasContext.drawImage(guiCompassPic, 400,450);
	
	if(displayQuickKeysTimer > 275 && displayQuickKeysTimer < 300){
		colorText("W",415,450,"white", '20px serif');
	} else {
		colorText("W",415,450,"black", '20px serif');
	};
	if(displayQuickKeysTimer > 250 && displayQuickKeysTimer < 275){
		colorText("WD",435,460,"white", '15px serif');
	} else {
		colorText("WD",435,460,"black", '15px serif');
	};
	if(displayQuickKeysTimer > 225 && displayQuickKeysTimer < 250){
		colorText("D",450,483,"white", '20px serif');
	} else {
		colorText("D",450,483,"black", '20px serif');
	};
	if(displayQuickKeysTimer > 200 && displayQuickKeysTimer < 225){
		colorText("SD",435,500,"white", '15px serif');
	} else {
		colorText("SD",435,500,"black", '15px serif');
	};
	if(displayQuickKeysTimer > 175 && displayQuickKeysTimer < 200){
		colorText("S",419,515,"white", '20px serif');
	} else {
		colorText("S",419,515,"black", '20px serif');
	};
	if(displayQuickKeysTimer > 150 && displayQuickKeysTimer < 175){
		colorText("SA",395,500,"white", '15px serif');
	} else {
		colorText("SA",395,500,"black", '15px serif');
	};
	if(displayQuickKeysTimer > 125 && displayQuickKeysTimer < 150){
		colorText("A",385,483,"white", '20px serif');
	} else {
		colorText("A",385,483,"black", '20px serif');
	};
	if(displayQuickKeysTimer > 100 && displayQuickKeysTimer < 125){
		colorText("WA",390,460,"white", '15px serif');
	} else {
		colorText("WA",390,460,"black", '15px serif');
	};
}
