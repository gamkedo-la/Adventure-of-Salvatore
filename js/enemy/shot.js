class attackClass {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xv = 0;
		this.yv = 0;
		this.width = 10;
		this.height = 10;
		this.readyToRemove = false;
		this.attackSpeed = 0;
		this.attackLifeSpan = ATTACK_DEFAULT_LIFE;
		this.ang = -0.5 * Math.PI;
		this.attackSound = crashIntoConeSound;
		this.missSound = swordMissSound;
		this.attacker = this;
		this.myBitmap = rockBulletPic;
		this.facingNorth = false;
		this.facingEast = false;
		this.facingSouth = true;
		this.facingWest = true;
	}

	picture = document.createElement("img");

	reset() {
		this.attackLifeSpan = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.xv = 0;
		this.yv = 0;
		this.readyToRemove = true;
		this.attacker = this;
		this.facingNorth = false;
		this.facingEast = false;
		this.facingSouth = true;
		this.facingWest = true;
	}

	done(){
		return this.attackLifeSpan <= 0;
	}

	whereTarget(target, attacker=this.attacker){
		var targetDir = { t: false, r: false, b: false, l: false };

		// if no attacker, set instance as attacker parameter and instance property
		if (attacker == undefined) { 
			attacker = this; 
			this.attacker = attacker;
		}

		if (target == undefined) {
			// if no target and playerOne isn't attacking, then target is playerOne
			if (attacker !== playerOne && attacker !== this) {
				target = { x: playerOne.x, y: playerOne.y };
			} else {
				// attacker is not an enemy or is self (ie. abondoned attack)
				// set to where attacker is facing
				var targetIsT =
					(attacker.facingNorth && !attacker.facingWest) ||
					(attacker.facingEast && !attacker.facingSouth);
				var targetIsR =
					(attacker.facingEast && !attacker.facingNorth) ||
					(attacker.facingSouth && !attacker.facingWest);
				var targetIsB = 
					(attacker.facingSouth && !attacker.facingEast) ||
					(attacker.facingWest && !attacker.facingNorth);
				var targetIsL = 
					(attacker.facingNorth && !attacker.facingEast) ||
					(attacker.facingWest && !attacker.facingSouth);

				const targetX = attacker.x + (targetIsR ? -1 : targetIsL ? 1 : 0);
				const targetY = attacker.y + (targetIsT ? -1 : targetIsB ? 1 : 0);
				target = { x: targetX, y: targetY };
			}
		}

		if (target == undefined) { 
			targetDir = returnFalse; 
		}

		targetDir = {
			t: target.y < attacker.y, // from playerTopOfUs
			r: target.x > attacker.x, // from playerRightOfUs
			b: target.y > attacker.y, // from playerBottomOfUs
			l: target.x < attacker.x, // from playerLeftOfUs
		}

		// attack cannot target itself and don't allow player to attack themselves
		if (target == this || (attacker == playerOne && target == playerOne)) { 
			targetDir = returnFalse; 
		}

		return targetDir;
	}

	
	targetDirections = [
		{ t: true, r: true, b: false, l: false, text: "top right" },
		{ t: true, r: false, b: false, l: true, text: "top left" },
		{ t: false, r: true, b: true, l: false, text: "bottom right" },
		{ t: false, r: false, b: true, l: true, text: "bottom left" },
		{ t: true, r: false, b: false, l: false, text: "top" },
		{ t: false, r: true, b: false, l: false, text: "right" },
		{ t: false, r: false, b: true, l: false, text: "bottom" },
		{ t: false, r: false, b: false, l: true, text: "left" },
		{ t: false, r: false, b: false, l: false, text: "no" },

		// use these extra while using Manhattan distance hueristic for A*
		// because the attacker might be facing in one of 4 directions
		// 45 degrees counter-clockwise
		{ t: true, r: true, b: false, l: false, text: "top" },
		{ t: true, r: false, b: false, l: true, text: "left" },
		{ t: false, r: true, b: true, l: false, text: "right" },
		{ t: false, r: false, b: true, l: true, text: "bottom" },
		{ t: true, r: false, b: false, l: false, text: "top left" },
		{ t: false, r: true, b: false, l: false, text: "top right" },
		{ t: false, r: false, b: true, l: false, text: "bottom right" },
		{ t: false, r: false, b: false, l: true, text: "bottom left" },

		// 45 degrees clockwise
		{ t: true, r: true, b: false, l: false, text: "right" },
		{ t: true, r: false, b: false, l: true, text: "top" },
		{ t: false, r: true, b: true, l: false, text: "bottom" },
		{ t: false, r: false, b: true, l: true, text: "left" },
		{ t: true, r: false, b: false, l: false, text: "top right" },
		{ t: false, r: true, b: false, l: false, text: "bottom right" },
		{ t: false, r: false, b: true, l: false, text: "bottom left" },
		{ t: false, r: false, b: false, l: true, text: "top left" },
	];

	modNO = { x: -45, y: -45, xv: -1, yv: -1, targetDirText: "no" };
	modNE = { x: 0, y: 0, xv: 0, yv: -1, targetDirText: "top" };
	modSE = { x: -30, y: -30, xv: 1, yv: 0, targetDirText: "right" };
	modSW = { x: -70, y: -30, xv: 0, yv: 1, targetDirText: "bottom"};
	modNW = { x: -30, y: -60, xv: -1, yv: 0, targetDirText: "left" };
	modN = { x: -45, y: -60, xv: -1, yv: -1, targetDirText: "top left" };
	modE = { x: -30, y: -20, xv: 1, yv: -1, targetDirText: "top right" };
	modS = { x: -45, y: -20, xv: 1, yv: 1, targetDirText: "bottom right" };
	modW = { x: -70, y: -80, xv: -1, yv: 1, targetDirText: "bottom left" };

	attackModifiers = [
		{ n: true, e: true, s: false, w: false, mod: this.modNE },
		{ n: true, e: false, s: false, w: true, mod: this.modNW },
		{ n: false, e: true, s: true, w: false, mod: this.modSE },
		{ n: false, e: false, s: true, w: true, mod: this.modSW },
		{ n: true, e: false, s: false, w: false, mod: this.modN },
		{ n: false, e: true, s: false, w: false, mod: this.modE },
		{ n: false, e: false, s: true, w: false, mod: this.modS },
		{ n: false, e: false, s: false, w: true, mod: this.modW },
		{ n: false, e: false, s: false, w: false, mod: this.modNO },
	];

	attackFrom(attacker=this.attacker,onlyIfFacing=true){
		// set new attacker in cases of deflect attacks or used but unbroken projectiles
		this.attacker = attacker;
		var didFire = attacker == playerOne;
		if (!didFire) {
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
						}
					});
					return;
				}
			});
		}

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
	
	movement() {
		this.attackLifeSpan--;
		this.x += this.xv;
		this.y += this.yv;
		this.facingNorth = this.yv < 0;
		this.facingEast = this.xv > 0;
		this.facingSouth = this.yv >= 0;
		this.facingWest = this.xv <= 0;
	}	
	
	hitTest(target) {
		// calls target's collitionTest method, not this instance's
		let didHit = false;
		if (target && !this.readyToRemove) {
			didHit = target.collisionTest(this);
		}
		
		if(didHit){
			if (this.attackSound) { 
				this.attackSound.play(); 
			}
			this.reset();
		}

		return didHit;
	}

	collisionTest(otherHumanoid){
		let wMod = Math.max(20, otherHumanoid.width/2);
		let hMod = Math.max(20, otherHumanoid.height/2);
		if(	this.x > otherHumanoid.x - wMod && this.x < otherHumanoid.x + wMod &&
			this.y > otherHumanoid.y - hMod && this.y < otherHumanoid.y + hMod){
				this.readyToRemove = true;
				return true;
		}
		return false;
	}
	
	draw(){
		if (this.myBitmap && !this.readyToRemove) {
			gameCoordToIsoCoord (this.x, this.y)
			canvasContext.drawImage(this.myBitmap,isoDrawX, isoDrawY);
		}
	}

	damageAmount(){ 
		return DAMAGE_DEFAULT;
	}

	playMissSound(){
		if (this.missSound) { 
			this.missSound.play(); 
		}
	}
}

class shotClass extends attackClass {
	constructor() {
		super();
		this.attackSpeed = SHOT_SPEED;
		this.attackLifeSpan = SHOT_LIFE;
		this.myBitmap = rockBulletPic;
	}
}

class meleeAttackClass extends attackClass {
	constructor() {
		super();
		this.attackSpeed = MELEE_ATTACK_SPEED;
		this.attackLifeSpan = MELEE_ATTACK_LIFE;
		this.myBitmap = meleeAttackPic;
		this.attackSound = swordSwing2Sound;
		this.width = 30;
		this.height = 30;

		this.modNO = { x: -45, y: -45, xv: -1, yv: -1, text: true };
		this.modNE = { x: -30, y: -60, xv: 0, yv: -1, text: "top" };
		this.modSE = { x: 0, y: 30, xv: 1, yv: 0, text: "right" };
		this.modSW = { x: 0, y: -30, xv: 0, yv: 1, text: "bottom"};
		this.modNW = { x: -40, y: -30, xv: -1, yv: 0, text: "left" };
		this.modN = { x: -45, y: -60, xv: -1, yv: -1, text: "top left" };
		this.modE = { x: 30, y: -20, xv: 1, yv: -1, text: "top right" };
		this.modS = { x: 45, y: 20, xv: 1, yv: 1, text: "bottom right" };
		this.modW = { x: -70, y: 60, xv: -1, yv: 1, text: "bottom left" };
	}
}
	