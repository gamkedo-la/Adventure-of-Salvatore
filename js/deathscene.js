var deathBannerBarTimer = 0;
var deathBannerBarY = 400;



function drawDeathScene(){
    deathBannerBarTimer++;
    canvasContext.drawImage(deathScenePic, 0, 0);
    if(deathBannerBarTimer > 10 && deathBannerBarTimer < 100){
        if(deathBannerBarTimer > 20 && deathBannerBarTimer < 80){
            deathBannerBarY++;
        }
        colorRect(160, deathBannerBarY, 450, 100, 'white', fillAlpha = 0.8);
        colorText('Thank you for playing ', 220, deathBannerBarY+36, "black",'36px serif');
        colorText('"The Adventure Of Salvatore"', 170, deathBannerBarY+80, "black",'36px serif');
        
    }
    if(deathBannerBarTimer == 120) {
        deathBannerBarY = 700
    }
    if(deathBannerBarTimer > 120 && deathBannerBarTimer < 2000){
            deathBannerBarY--;
        colorRect(160, deathBannerBarY, 480, 150, 'white', fillAlpha = 0.8);
        colorText('Game Developed by', 240, deathBannerBarY+36, "black",'36px serif');
        colorText('HomeTeam Outpost', 255, deathBannerBarY+80, "black",'36px serif');
        colorText('Led by Vince McKeown', 220, deathBannerBarY+124, "black",'36px serif');

        colorRect(160, deathBannerBarY + 400, 480, 580, 'white', fillAlpha = 0.8);
        colorText('Special thanks to:', 260, deathBannerBarY+444, "black",'36px serif');
        colorText('Chris DeLeon', 280, deathBannerBarY+488, "black",'36px serif');
        colorText('Christer McFunkyPants Kaitila', 180, deathBannerBarY+532, "black",'36px serif');
        colorText('Patrick McKeown', 250, deathBannerBarY+576, "black",'36px serif');
        colorText('Jason Timms', 270, deathBannerBarY+620, "black",'36px serif');
        colorText('Gabriel "Adamastor" Da Mota', 180, deathBannerBarY+664, "black",'36px serif');
        colorText('Randy Tan Shaoxiana', 220, deathBannerBarY+708, "black",'36px serif');
        colorText('Michael "Misha" Fewkes', 200, deathBannerBarY+752, "black",'36px serif');
        colorText('Kyle Knutson', 280, deathBannerBarY+796, "black",'36px serif');
        colorText('and to my wife,', 260, deathBannerBarY+840, "black",'36px serif');
        colorText('Pauline McKeown', 250, deathBannerBarY+884, "black",'36px serif');
        colorText('and daughter,', 270, deathBannerBarY+928, "black",'36px serif');
        colorText('Mary McKeown',270, deathBannerBarY+972, "black",'36px serif');
    }
}