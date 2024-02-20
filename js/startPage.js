function drawStartPage(){
    colorRect(0,0,canvas.width,canvas.height, 'blue');
    canvasContext.drawImage(mainScreenBackgroundPic, 0, 0);
    colorRect(200, 200, 400, 100, 'white', fillAlpha = 0.8);
    colorText("Press 'Space Bar' to start", 220, 260, "black",'36px serif');
}