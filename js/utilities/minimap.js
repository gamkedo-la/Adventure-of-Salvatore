
// the minimap is an offscreen canvas
// that we draw in a single draw call on the gui
// it does not need to be updated every frame

const MINIMAP_GUI_X = 630;
const MINIMAP_GUI_Y = 5;
const MINIMAP_GUI_W = 50;
const MINIMAP_GUI_H = 320;
const MINIMAP_DOT_W = 4;
const MINIMAP_DOT_H = 4;
const MINIMAP_OPACITY = 1;

var minimapCanvas = document.createElement("canvas");
var minimapContext = minimapCanvas.getContext("2d");

// draw the minimap onto the main game canvas
function drawMinimap() {
    canvasContext.globalAlpha = MINIMAP_OPACITY;
    canvasContext.drawImage(minimapCanvas,MINIMAP_GUI_X,MINIMAP_GUI_Y);
    // TODO - iterate through enemies and draw them too
    canvasContext.globalAlpha = 1;
}

// draw map tile dots on the offscreen minimap canvas
function updateMinimap(miniMapX,miniMapY,trackTypeHere) {
	if(trackTypeHere == 0){
        minimapContext.fillStyle = "white";
    } else if (trackTypeHere == 1 || trackTypeHere == 11 || trackTypeHere == 12 ){
        minimapContext.fillStyle = "gray";
	} else if (trackTypeHere == 3 || trackTypeHere == 6 || trackTypeHere == 7){
        minimapContext.fillStyle = "blue";
	} else if (trackTypeHere == 4 || trackTypeHere == 8){
        minimapContext.fillStyle = "purple";
	} else if (trackTypeHere == 5){
        minimapContext.fillStyle = "orange";
	} else { // just in case we have nulls etc
        minimapContext.fillStyle = "black";
    }
    minimapContext.fillRect(miniMapX,miniMapY,MINIMAP_DOT_W,MINIMAP_DOT_H);
}