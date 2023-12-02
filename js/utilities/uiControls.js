const KEY_W = 87; 
const KEY_S = 83; 
const KEY_A = 65; 
const KEY_D = 68; 
const KEY_B = 66; //Mute
const KEY_M = 77; //Menu
const KEY_N = 78; //Map
const KEY_P = 80; //Pause
const KEY_I = 73; //Items
const KEY_SPACEBAR = 32; 
const KEY_1 = 49;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;


var MousePosX = 0;
var MousePosY = 0;

var displayQuickKeysOn = true;
var displayQuickKeysTimer = 300;

function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SPACEBAR);
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

	if(paused == evt.keyCode){
		changePauseState();
	} else if (muteKey == evt.keyCode){
		isMuted = !isMuted;
	} else if (speedPotion == evt.keyCode){
		playerOne.useSpeedPotion();
	} else if (menuKey == evt.keyCode){
		console.log("Go to Menu Screen");
	} else if (mapKey == evt.keyCode){
		console.log("Toggle Map on/off");
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

	if (!pauseScreen) {
		if(thisKey == thisWarrior.controlKeyForNorth){
			thisWarrior.keyHeld_North = setTo;
		}
		if(thisKey == thisWarrior.controlKeyForEast){
			thisWarrior.keyHeld_East = setTo;
		}
		if(thisKey == thisWarrior.controlKeyForSouth){
			thisWarrior.keyHeld_South = setTo;
		}
		
		if(thisKey == thisWarrior.controlKeyForWest){
			thisWarrior.keyHeld_West = setTo;
		}
	
		if(thisKey == thisWarrior.controlKeyForSwordSwing){
			if(playerOne.swordReady){
				playerOne.swordSwing();
			}
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

function checkGUIMousePos(){
	let box1X = 20;
	let box1Y = 525;
	let box1Width = 100;
	let box1Height = 35;
	if (MousePosX > box1X && MousePosX < box1X + box1Width &&
		MousePosY > box1Y && MousePosY < box1Y + box1Height){
			/*if(MouseEvent.onClick){
				console.log("mouse clicked");
			}*/
			console.log("Menu");
		
	};
	let box2X = 20;
	let box2Y = 561;
	let box2Width = 100;
	let box2Height = 35;
	if (MousePosX > box2X && MousePosX < box2X + box2Width &&
		MousePosY > box2Y && MousePosY < box2Y + box2Height){
			/*if(MouseEvent.onClick){
				console.log("mouse clicked");
			}*/
			console.log("Items");
		
	};
	let box3X = canvas.width - 120;
	let box3Y = 525;
	let box3Width = 100;
	let box3Height = 35;
	if (MousePosX > box3X && MousePosX < box3X + box3Width &&
		MousePosY > box3Y && MousePosY < box3Y + box3Height){
			/*if(MouseEvent.onClick){
				console.log("mouse clicked");
			}*/
			console.log("Map");
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
	colorText("Feedback to player", canvas.width - 315, 555, 'BLACK', '12px serif');
	
	let startX = 150
	let startY = 561
	let amountOfHolders = 6;
	let holderSpot = 0
	let holderSpacing = 50;
	for(holderSpot; holderSpot < amountOfHolders; holderSpot++){
		canvasContext.drawImage(guiPotionHolderPic, startX + (holderSpot * holderSpacing), startY);
		colorText(holderSpot + 1, startX + (holderSpot * holderSpacing) + 22, startY + 28, 'white', '12px serif');
	}
	let healthBarHolderX = startX
	let healthBarHolderY = 540;
	let healthX = startX + 20;
	canvasContext.drawImage(healthbarPic, healthBarHolderX,healthBarHolderY);
	for(var i = 0; i < playerOne.health; i++){
		canvasContext.drawImage(healthPic, healthBarHolderX +25 + (i*9),healthBarHolderY);
	}
	colorText("Coins: " + playerOne.coins, canvas.width - 100, 585, 'BLACK', '16px serif');
	if(displayQuickKeysOn){
		displayQuickKeys()
	};
}

function displayQuickKeys(){
	displayQuickKeysTimer--;
	console.log("display")
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
