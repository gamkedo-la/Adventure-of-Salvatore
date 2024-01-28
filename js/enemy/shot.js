function shotClass(){
	this.x;
	this.y;
	this.xv;
	this.xy;
	this.width = 10;
	this.height = 10;
	this.readyToRemove = false;
	
	this.picture = document.createElement("img");

	this.reset = function() {
		this.shotLife = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.readyToRemove = true;
	}
		
	this.isShotReadyToFire = function(){
		return (this.shotLife <= 0);
	}
	
	this.shootFrom = function(enemy){		
		if(enemy.moveNorth && enemy.moveEast){
			this.xv = 0;
			this.yv = SHOT_SPEED;
			this.x = enemy.x;
			this.y = enemy.y;
		} else if (enemy.moveNorth && enemy.moveWest){
			this.xv = -SHOT_SPEED;
			this.yv = 0;
			this.x = enemy.x-30;
			this.y = enemy.y-60;
		} else if (enemy.moveSouth && enemy.moveEast){
			this.xv = SHOT_SPEED;
			this.yv = 0;
			this.x = enemy.x-30;
			this.y = enemy.y-30;
		} else if (enemy.moveSouth && enemy.moveWest){
			this.xv = 0;
			this.yv = SHOT_SPEED;
			this.x = enemy.x-70;
			this.y = enemy.y-30;
		} else if(enemy.moveNorth){
			this.xv = -SHOT_SPEED 
			this.yv = -SHOT_SPEED 
			this.x = enemy.x-45;
			this.y = enemy.y-60;
		} else if (enemy.moveEast){
			this.xv = SHOT_SPEED 
			this.yv = -SHOT_SPEED 
			this.x = enemy.x-30;
			this.y = enemy.y-20;
		} else if (enemy.moveSouth){
			this.xv = SHOT_SPEED 
			this.yv = SHOT_SPEED 
			this.x = enemy.x-45;
			this.y = enemy.y-20;
		} else if (enemy.moveWest){
			this.xv = -SHOT_SPEED 
			this.yv = SHOT_SPEED 
			this.x = enemy.x-70;
			this.y = enemy.y-80;
		} else {
			this.xv = SHOT_SPEED 
			this.yv = SHOT_SPEED 
			this.x = enemy.x-45;
			this.y = enemy.y-45;
		}
		this.shotLife = SHOT_LIFE;
	}
	
	this.movement = function() {
			this.shotLife--;
			this.x += this.xv;
			this.y += this.yv;
	}	
	
	this.hitTest = function(thisEnemy) {
		this.readyToRemove = true;
		console.log()
		return thisEnemy.collisionTest(this.x,this.y);
	}

	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				this.readyToRemove = true;
				return true;
		}
		return false;
	}
	
	this.draw = function(){
		gameCoordToIsoCoord (this.x, this.y)
		canvasContext.drawImage(rockBulletPic,isoDrawX, isoDrawY);
	}
}