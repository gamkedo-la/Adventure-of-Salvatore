function attackClass(){
	this.x;
	this.y;
	this.xv;
	this.xy;
	this.width = 10;
	this.height = 10;
	this.readyToRemove = false;
	this.attackSpeed = 0;
	this.attackLifeSpan = ATTACK_DEFAULT_LIFE;
	this.attackSound = crashIntoConeSound;
	this.missSound = swordMissSound;
	this.attacker = { x: 0, y: 0 };
	this.myBitmap = rockBulletPic;
	
	this.picture = document.createElement("img");

	this.reset = function() {
		this.attackLifeSpan = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.readyToRemove = true;
	}
		
	this.done = function(){
		return (this.attackLifeSpan <= 0);
	}

	this.whereTarget = function(target=playerOne, attacker=this.attacker){
		return {
			t: target.y < attacker.y, // playerTopOfUs
			r: target.x > attacker.x, // playerRightOfUs
			b: target.y > attacker.y, // playerBottomOfUs
			l: target.x < attacker.x, // playerLeftOfUs
		}
	}

	this.targetDirections = [
		{ t: false, r: false, b: false, l: false, text: "no" },
		{ t: true, r: true, b: false, l: false, text: "top right" },
		{ t: true, r: false, b: false, l: true, text: "top left" },
		{ t: false, r: true, b: true, l: false, text: "bottom right" },
		{ t: false, r: false, b: true, l: true, text: "bottom left" },
		{ t: true, r: false, b: false, l: false, text: "top" },
		{ t: false, r: true, b: false, l: false, text: "right" },
		{ t: false, r: false, b: true, l: false, text: "bottom" },
		{ t: false, r: false, b: false, l: true, text: "left" },
	];

	this.modNO = { x: -45, y: -45, xv: -1, yv: -1, targetDirText: "no" };
	this.modNE = { x: 0, y: 0, xv: 0, yv: -1, targetDirText: "top" };
	this.modSE = { x: -30, y: -30, xv: 1, yv: 0, targetDirText: "right" };
	this.modSW = { x: -70, y: -30, xv: 0, yv: 1, targetDirText: "bottom"};
	this.modNW = { x: -30, y: -60, xv: -1, yv: 0, targetDirText: "left" };
	this.modN = { x: -45, y: -60, xv: -1, yv: -1, targetDirText: "top left" };
	this.modE = { x: -30, y: -20, xv: 1, yv: -1, targetDirText: "top right" };
	this.modS = { x: -45, y: -20, xv: 1, yv: 1, targetDirText: "bottom right" };
	this.modW = { x: -70, y: -80, xv: -1, yv: 1, targetDirText: "bottom left" };

	this.attackModifiers = [
		{ n: false, e: false, s: false, w: false, mod: this.modNO },
		{ n: true, e: true, s: false, w: false, mod: this.modNE },
		{ n: true, e: false, s: false, w: true, mod: this.modNW },
		{ n: false, e: true, s: true, w: false, mod: this.modSE },
		{ n: false, e: false, s: true, w: true, mod: this.modSW },
		{ n: true, e: false, s: false, w: false, mod: this.modN },
		{ n: false, e: true, s: false, w: false, mod: this.modE },
		{ n: false, e: false, s: true, w: false, mod: this.modS },
		{ n: false, e: false, s: false, w: true, mod: this.modW },
	];

	this.attackFrom = function(attacker=this.attacker,onlyIfFacing=true){
		this.attacker = attacker;

		var didFire = false;	
		this.attackModifiers.find( (am) => {
			if (didFire) { return; }
			if (attacker.facingNorth == am.n && attacker.facingEast == am.e && 
				attacker.facingSouth == am.s && attacker.facingWest == am.w)
			{
				this.xv = am.mod.xv * this.attackSpeed;
				this.yv = am.mod.yv * this.attackSpeed;
				this.x = attacker.x + am.mod.x;
				this.y = attacker.y + am.mod.y;

				const targetDir = this.whereTarget();
				this.targetDirections.find( (dir) => {
					if (didFire) { return; }
					if (dir.t == targetDir.t && dir.r == targetDir.r && 
						dir.b == targetDir.b && dir.l == targetDir.l
					) {
						didFire = (am.mod.targetDirText == dir.text);
						return;
					}
				});
				return;
			}
		});

		if(onlyIfFacing == false){
			didFire = true;
		}
		if(didFire){
			attacker.addAttack(this);
			if (this.attackSound) {
				this.attackSound.play();
			}
		}
	}
	
	this.movement = function() {
		this.attackLifeSpan--;
		this.x += this.xv;
		this.y += this.yv;
	}	
	
	this.hitTest = function(target) {
		// calls attacker's collitionTest method, not this one instance's
		this.readyToRemove = target.collisionTest(this);
		return this.readyToRemove;
	}

	this.collisionTest = function(otherHumanoid){
		let wMod = Math.max(20, otherHumanoid.width/2);
		let hMod = Math.max(20, otherHumanoid.height/2);
		if(	this.x > otherHumanoid.x - wMod && this.x < otherHumanoid.x + wMod &&
			this.y > otherHumanoid.y - hMod && this.y < otherHumanoid.y + hMod){
				this.readyToRemove = true;
				return true;
		}
		return false;
	}
	
	this.draw = function(){
		if (this.myBitmap && !this.readyToRemove) {
			gameCoordToIsoCoord (this.x, this.y)
			canvasContext.drawImage(this.myBitmap,isoDrawX, isoDrawY);
		}
	}

	this.damageAmount = function(){ 
		return DAMAGE_DEFAULT;
	}
}

function shotClass(){
	this.attack = new attackClass();
	this.attack.attackSpeed = SHOT_SPEED;
	this.attack.attackLifeSpan = SHOT_LIFE;
	this.attack.myBitmap = rockBulletPic;
	
	this.reset = function(){
		this.attack.reset();
	}

	this.done = function(){
		return this.attack.done();
	}

	this.isShotReadyToFire = function(){
		return this.attack.done();
	}
	
	this.attackFrom = function(attacker, onlyIfFacing){
		this.attack.attackFrom(attacker, onlyIfFacing);
	}

	this.movement = function() {
		this.attack.movement();
		this.shotLife = this.attack.attackLifeSpan;
	}

	this.hitTest = function(target) {
		return this.attack.hitTest(target);
	}

	this.draw = function(){
		this.attack.draw();
	}

	this.damageAmount = function(){
		this.attack.damageAmount();
	}
}

function meleeAttackClass(){
	this.attack = new attackClass();
	this.attack.attackSpeed = MELEE_ATTACK_SPEED;
	this.attack.attackLifeSpan = MELEE_ATTACK_LIFE;
	this.attack.myBitmap = meleeAttackPic;
	this.attack.attackSound = swordSwing2Sound;
	this.attack.width = 30;
	this.attack.height = 30;

	this.attack.modNO = { x: -45, y: -45, xv: -1, yv: -1, text: true };
	this.attack.modNE = { x: -30, y: 0, xv: 0, yv: -1, text: "top" };
	this.attack.modSE = { x: 0, y: 30, xv: 1, yv: 0, text: "right" };
	this.attack.modSW = { x: 0, y: -30, xv: 0, yv: 1, text: "bottom"};
	this.attack.modNW = { x: -30, y: 0, xv: -1, yv: 0, text: "left" };
	this.attack.modN = { x: -45, y: -60, xv: -1, yv: -1, text: "top left" };
	this.attack.modE = { x: 30, y: -20, xv: 1, yv: -1, text: "top right" };
	this.attack.modS = { x: 45, y: 20, xv: 1, yv: 1, text: "bottom right" };
	this.attack.modW = { x: -70, y: 80, xv: -1, yv: 1, text: "bottom left" };

	this.reset = function(){
		this.attack.reset();
	}

	this.done = function(){
		return this.attack.done();
	}

	this.isShotReadyToFire = function(){
		return this.attack.done();
	}
	
	this.attackFrom = function(attacker, onlyIfFacing){
		this.attack.attackFrom(attacker, onlyIfFacing);
	}

	this.movement = function() {
		this.attack.movement();
	}

	this.hitTest = function(target) {
		let didHit = this.attack.hitTest(target);
		if(didHit){
			this.attack.attackSound.play();
		} else {
			this.attack.missSound.play();
		}
		return didHit;
	}

	this.draw = function(){
		this.attack.draw();
	}

	this.damageAmount = function(){
		this.attack.damageAmount();
	}
}
	