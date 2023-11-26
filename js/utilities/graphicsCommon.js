function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, fillAlpha = 1.0){
	canvasContext.fillStyle = fillColor;
    canvasContext.save();
    canvasContext.globalAlpha = fillAlpha;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
    canvasContext.restore();
}
			
function colorCircle(centerX, centerY, radius, fillColor, fillAlpha = 1.0){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.save();
    canvasContext.globalAlpha = fillAlpha;
	canvasContext.fill();
    canvasContext.restore();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
	canvasContext.save(); //allows undo translate movement and rotate spin
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.rotate(withAngle); //sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draws car
	canvasContext.restore(); //undoes the translation movement and rotation since save()
}

function colorText(showWords, textX, textY, fillColor, fontStyle) {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = fontStyle; //"14px Arial Black"
  canvasContext.fillText(showWords, textX, textY);
}
