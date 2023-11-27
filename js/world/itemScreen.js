var itemScreen = false;

function itemScreenDisplay(){
    canvasContext.drawImage(itemBackgroundPic, 0, 0);
    //belt
    colorText("Belt", 60, 300, 'black', '18px serif');
    colorRect(30, 300, 200, 200, "white", fillAlpha = .3);
    //backpack
    colorText("Backpack", 590, 300, 'black', '18px serif');
    colorRect(570, 300, 200, 200, "white", fillAlpha = .3);
    colorRect(275, 370, 40, 40, "white", fillAlpha = .3);
    colorRect(490, 370, 40, 40, "white", fillAlpha = .3);

}