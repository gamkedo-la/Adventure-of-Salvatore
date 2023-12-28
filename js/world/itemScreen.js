var itemScreen = false;

function itemScreenDisplay(){
    canvasContext.drawImage(itemBackgroundPic, 0, 0);
    //belt
    colorText("Belt", 60, 300, 'black', '18px serif');
    colorRect(30, 300, 200, 200, "white", fillAlpha = .3);
    canvasContext.drawImage(guiPotionHolderPic, 50, 350);
    canvasContext.drawImage(guiPotionHolderPic, 100, 350);
    canvasContext.drawImage(guiPotionHolderPic, 150, 350);
    canvasContext.drawImage(guiPotionHolderPic, 50, 400);
    canvasContext.drawImage(guiPotionHolderPic, 100, 400);
    canvasContext.drawImage(guiPotionHolderPic, 150, 400);
    //backpack
    colorText("Backpack", 590, 300, 'black', '18px serif');
    colorRect(570, 300, 200, 200, "white", fillAlpha = .3);
    colorRect(275, 370, 40, 40, "white", fillAlpha = .3);
    colorRect(490, 370, 40, 40, "white", fillAlpha = .3);
    if(playerOne.blueKeysHeld > 0){
        canvasContext.drawImage(trackPics[TILE_KEY_BLUE], 0,50,50,50,570, 300,50,50);
    }
    if(playerOne.redKeysHeld > 0){
        canvasContext.drawImage(trackPics[TILE_KEY_RED], 0,50,50,50,570, 320,50,50);
    }
    if(playerOne.greenKeysHeld > 0){
        canvasContext.drawImage(trackPics[TILE_KEY_GREEN], 0,50,50,50,570, 340,50,50);
    }
    if(playerOne.yellowKeysHeld > 0){
        canvasContext.drawImage(trackPics[TILE_KEY_YELLOW], 0,50,50,50,570, 360,50,50);
    }
}