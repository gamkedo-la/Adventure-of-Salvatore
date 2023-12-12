const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;
var missShot = -10;

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
		
		//this.xv = Math.cos(enemy.ang) * SHOT_SPEED + enemy.xv;
		//this.yv = Math.sin(enemy.ang) * SHOT_SPEED + enemy.yv;
		
		this.shotLife = SHOT_LIFE;
	}
	
	this.movement = function() {
	//	if(this.shotLife > 0){
			this.shotLife--;
			//this.x += this.xv;
			//this.y += this.yv;
			this.x += 1;
			this.y += 1;

	//	}	
	}	
	
	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0) {
			this.readyToRemove = true;
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
	//	if(this.shotLife > 0){
		//	console.log("X: " + this.x + " Y: " + this.y)
		canvasContext.drawImage(rockBulletPic,isoDrawX-(this.width/2), isoDrawY-this.height);
	//	}
	}
}