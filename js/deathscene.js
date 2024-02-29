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
        deathBannerBarY = 800
    }
    if(deathBannerBarTimer > 120 && deathBannerBarTimer < 2000){
            deathBannerBarY--;
        colorRect(160, deathBannerBarY, 480, 150, 'white', fillAlpha = 0.8);
        colorText('Game Developed by', 220, deathBannerBarY+36, "black",'36px serif');
        colorText('HomeTeam Outpost', 220, deathBannerBarY+80, "black",'36px serif');
        colorText('Led by Vince McKeown', 220, deathBannerBarY+116, "black",'36px serif');

        colorRect(160, deathBannerBarY + 400, 480, 600, 'white', fillAlpha = 0.8);
        colorText('Special thanks to:', 220, deathBannerBarY+436, "black",'36px serif');
        colorText('Chris DeLeon', 220, deathBannerBarY+480, "black",'36px serif');
        colorText('Christer McFunkyPants Kaitila', 180, deathBannerBarY+524, "black",'36px serif');
        colorText('Patrick McKeown', 180, deathBannerBarY+568, "black",'36px serif');
        colorText('Jason Timms', 180, deathBannerBarY+604, "black",'36px serif');
        colorText('Gabriel "Adamastor" Da Mota', 180, deathBannerBarY+648, "black",'36px serif');
        colorText('Randy Tan Shaoxiana', 180, deathBannerBarY+692, "black",'36px serif');
        colorText('Michael "Misha" Fewkes', 180, deathBannerBarY+738, "black",'36px serif');
        colorText('Kyle Knutson', 180, deathBannerBarY+782, "black",'36px serif');
        colorText('and to my wife,', 180, deathBannerBarY+826, "black",'36px serif');
        colorText('Pauline McKeown', 180, deathBannerBarY+872, "black",'36px serif');
        colorText('and daughter,', 180, deathBannerBarY+908, "black",'36px serif');
        colorText('Mary McKeown', 180, deathBannerBarY+952, "black",'36px serif');

    }
    //create a loop to capture the team
}