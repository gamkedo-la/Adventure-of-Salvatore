const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_SPACEBAR = 32; 
const KEY_1 = 49;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_P = 80;
const KEY_M = 77;


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
	var muteKey = KEY_M;
	//var addRockBulletKey = KEY_SPACEBAR; // just for troubleshooting wall trap 
	var speedPotion = KEY_1;

	if(paused == evt.keyCode){
		changePauseState();
	}
	if (muteKey == evt.keyCode){
		isMuted = !isMuted;
	}
	/*if(addRockBulletKey == evt.keyCode){ // just for toubleshooting wall trap (can be removed)
		addRockBullet();
	}*/
	if (speedPotion == evt.keyCode){
		playerOne.useSpeedPotion();
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, playerOne, false);
}


function setKeyHoldState(thisKey, thisWarrior, setTo) {
	
	document.getElementById("debugText").innerHTML = "Key: " +thisKey;
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

function changePauseState(){
	if(pauseScreen){
		pauseScreen = false;
	} else {
		pauseScreen = true;
	}	
}

