var deathBannerBarTimer = 0;
var deathBannerBarY = 400;



function drawDeathScene(){
    deathBannerBarTimer++;
    canvasContext.drawImage(deathScenePic, 0, 0);
    if(deathBannerBarTimer > 10 && deathBannerBarTimer < 100){
        if(deathBannerBarTimer > 20 && deathBannerBarTimer < 80){
            deathBannerBarY++;
        }
        colorRect(160, deathBannerBarY, 480, 100, 'white', fillAlpha = 0.8);
        colorText('Thank you for playing ', 220, deathBannerBarY+36, "black",'36px serif');
        colorText('"The Adventure Of Salvatore"', 170, deathBannerBarY+80, "black",'36px serif');
        
    }
    if(deathBannerBarTimer == 120) {
        deathBannerBarY = 100
    }
    if(deathBannerBarTimer > 120 && deathBannerBarTimer < 200){
            deathBannerBarY++;
        colorRect(160, deathBannerBarY, 480, 100, 'white', fillAlpha = 0.8);
        colorText('Game Developed by', 220, deathBannerBarY+36, "black",'36px serif');
        colorText('HomeTeam Outpost', 220, deathBannerBarY+80, "black",'36px serif');
    }
    //create a loop to capture the team
}