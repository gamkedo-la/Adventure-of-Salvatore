var xPosSword = -20;
var yPosSword= 0;
var xMovementSword = 1;
var yMovementSword = 1;
var swordTimer = 0;
var bannerBarTimer = 0;
var bannerBarY = 400;

var showingCredits = false;

function drawStartPage(){
    if(showingCredits) {
        colorRect(200, bannerBarY, 400, 100, 'white', fillAlpha = 0.8);
        colorText("Press any key to start", 220, bannerBarY+36, "black",'36px serif');
        return;
    }
    swordTimer++;
    bannerBarTimer++;
    
    if(swordTimer > 5){

        if (xPosSword <= -20){
            xMovementSword++;
        } else if (xPosSword >= -10){
            xMovementSword--;
        }

        if (yPosSword >= 5){
            yMovementSword--;
        } else if (yPosSword <=0){
            yMovementSword++;
        }
        xPosSword = xPosSword + xMovementSword;
        yPosSword = yPosSword + yMovementSword;
        swordTimer = 0;
    }

    if(bannerBarTimer > 2 && bannerBarY < 500){
        bannerBarY++;
        bannerBarTimer = 0;
    } 

    colorRect(0,0,canvas.width,canvas.height, 'blue');
    canvasContext.drawImage(mainScreenBackgroundPic, 0, 0);
    colorRect(200, bannerBarY, 400, 100, 'white', fillAlpha = 0.8);
    colorText("Press 'Space Bar' to start", 220, bannerBarY+36, "black",'36px serif');
    colorText("Press 'C' for credits", 260, bannerBarY+80, "black",'36px serif');
    canvasContext.drawImage(mainScreenSwordPic, xPosSword, yPosSword);
    if(bannerBarY >= 450){
        canvasContext.drawImage(theAdventureOfSalvatorePic, 0, 0); 
    }
}