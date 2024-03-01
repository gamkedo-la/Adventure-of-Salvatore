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
        colorRect(200, bannerBarY, 400, 100, 'black', fillAlpha = 0.8);
        var lineX = 33;
        var lineY = 7;
        var creditsSize = 23;
        var lineSkip = creditsSize+2;
        canvasContext.font = creditsSize+"px Helvetica";
        for(var i=0;i<creditsList.length;i++) {
            colorText(creditsList[i], lineX, lineY+=lineSkip, "white");
        }
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

var creditsList = [
"Vince McKeown: Project lead, core gameplay, isometric world, art (player, most environment art - bookshelves, boxes, weapon racks, barrels, sacks, pots, beds, walls, etc), level design, speed potion, coin, enemies (blob, cyclops, skeletons), animation code, wall levers, in-game UI, inventory screen, projectile support, boss, start and death screens, various asset integration",
"Jason Timms: Enemy pathfinding and related AI, melee combat, projectile improvements, player movement bug fix, mute and pause toggle, image loading fix, better wall collision handling, improved Linux support",
"Patrick McKeown: Music, sounds (sword hit/miss, door opening, monster taking damage and menu sound with variations)",
"Christer \"McFunkypants\" Kaitila: Characters made visible through walls, player collision, blocking feature, player sword attack, minimap optimization, door color variations, out of bounds tile pattern, vignette border, debug path draw",
"Gabriel \"Adamastor\" Da Mota: Sprites (rogue, ranged monster, wall painting)",
"Randy Tan Shaoxian: Item/character shadow support, minimap improvements (player and colored door locations)",
"Michael \"Misha\" Fewkes: Sprite Z sorting",
"Kyle Knutson: Warrior attack animation",
"                         == PRESS ANY KEY TO CONTINUE == "];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 68;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }

        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function