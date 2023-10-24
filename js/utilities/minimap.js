
// the minimap is an offscreen canvas
// that we draw in a single draw call on the gui
// it does not need to be updated every frame

const MINIMAP_GUI_X = 630;
const MINIMAP_GUI_Y = 6;
const MINIMAP_GUI_W = 50;
const MINIMAP_GUI_H = 320; // is this too big?
const MINIMAP_DOT_W = 4;
const MINIMAP_DOT_H = 4;
const MINIMAP_OPACITY = 1;

var minimapCanvas = document.createElement("canvas");
var minimapContext = minimapCanvas.getContext("2d");
var minimapFrameCount = 0;

// draw the minimap onto the main game canvas
function drawMinimap() {
    
    // every tenth frame refresh the minimap
    if (minimapFrameCount % 10 == 0) updateMinimap();
    minimapFrameCount++;

    canvasContext.globalAlpha = MINIMAP_OPACITY;
    canvasContext.drawImage(minimapCanvas,MINIMAP_GUI_X,MINIMAP_GUI_Y);
    // TODO - iterate through enemies and draw them too
    canvasContext.globalAlpha = 1;
}

// draw map tile dots on the offscreen minimap canvas
function minimapDot(miniMapX,miniMapY,trackTypeHere="magenta") {
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
	} else { // special case: assume it's a string!!!! used for enemies etc
        minimapContext.fillStyle = trackTypeHere;
    }
    minimapContext.fillRect(miniMapX,miniMapY,MINIMAP_DOT_W,MINIMAP_DOT_H);
}

// draw all map tiles onto the minimap
function updateMinimap() {
    var tileIndex = 0;
    var miniMapX = 0;
    var miniMapY = 0;
    for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
        miniMapX = 0;
        for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
            var trackTypeHere = roomGrid[tileIndex];
            miniMapX += 4;
            minimapDot(miniMapX,miniMapY,trackTypeHere);
            tileIndex++;
        }
        miniMapY += 4;
    }
    
    // and all monsters
    for (mob of goblinList) { minimapDot(mob.x/ISO_TILE_DRAW_W*MINIMAP_DOT_W+2,mob.y/ISO_TILE_DRAW_H*MINIMAP_DOT_H,"darkgreen"); }
    for (mob of orcList) { minimapDot(mob.x/ISO_TILE_DRAW_W*MINIMAP_DOT_W+2,mob.y/ISO_TILE_DRAW_H*MINIMAP_DOT_H,"darkbrown"); }
    for (mob of ogreList) { minimapDot(mob.x/ISO_TILE_DRAW_W*MINIMAP_DOT_W+2,mob.y/ISO_TILE_DRAW_H*MINIMAP_DOT_H,"darkred"); }
    for (mob of ratList) { minimapDot(mob.x/ISO_TILE_DRAW_W*MINIMAP_DOT_W+2,mob.y/ISO_TILE_DRAW_H*MINIMAP_DOT_H,"darkgrey"); }

    // add more cool things to the minimap here!
}
