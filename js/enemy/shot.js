const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

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
		this.x = enemy.x;
		this.y = enemy.y;
		
		if(enemy.moveNorth && enemy.moveEast){
			this.xv = 0;
			this.yv = SHOT_SPEED;
		} else if (enemy.moveNorth && enemy.moveWest){
			this.xv = -SHOT_SPEED;
			this.yv = 0;
		} else if (enemy.moveSouth && enemy.moveEast){
			this.xv = SHOT_SPEED;
			this.yv = 0;
		} else if (enemy.moveSouth && enemy.moveWest){
			this.xv = 0;
			this.yv = SHOT_SPEED;
		} else if(enemy.moveNorth){
			this.xv = -SHOT_SPEED * Math.cos(45);
			this.yv = -SHOT_SPEED * Math.sin(45);
		} else if (enemy.moveEast){
			this.xv = SHOT_SPEED * Math.cos(45);
			this.yv = -SHOT_SPEED * Math.cos(45);
		} else if (enemy.moveSouth){
			this.xv = SHOT_SPEED * Math.cos(45);
			this.yv = SHOT_SPEED * Math.sin(45);
		} else if (enemy.moveWest){
			this.xv = -SHOT_SPEED * Math.cos(45);
			this.yv = SHOT_SPEED * Math.sin(45);
		} else {
			this.xv = SHOT_SPEED * Math.cos(45);
			this.yv = SHOT_SPEED * Math.sin(45);
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
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		gameCoordToIsoCoord (this.x, this.y)
		canvasContext.drawImage(rockBulletPic,isoDrawX, isoDrawY);
	}
}