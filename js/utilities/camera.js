function updatedCameraPosition(){
	gameCoordToIsoCoord(playerOne.x,playerOne.y);
	camPanX = isoDrawX - canvas.width/2;
	camPanY = isoDrawY - canvas.height/2;
	
	if(camPanX < -550){
		camPanX = -550;
	}
	if(camPanY < -550){
		camPanY = -550;
	}
	
	var rightEdgeX = ROOM_W * ROOM_COLS;
	var bottomEdgeY = ROOM_H * ROOM_ROWS;
	
	if(camPanX >= rightEdgeX - 1 - canvas.width){
		camPanX = rightEdgeX - 1 - canvas.width;
	}
	if(camPanY >= bottomEdgeY - 1 - canvas.height){
		camPanY = bottomEdgeY - 1 - canvas.height;
	}
}

function shiftForCameraPan(){
	canvasContext.save();
    // we lock these to integers to prevent
    // flickers, blurry pixels, and seams between tiles
    canvasContext.translate(Math.round(-camPanX), Math.round(-camPanY));
}

function finishedCameraPan(){
	canvasContext.restore();
}