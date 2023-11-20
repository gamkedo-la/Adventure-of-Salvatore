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
}
