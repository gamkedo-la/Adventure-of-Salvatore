class attackClass {
	#x = 0;
	#y = 0;
	get x() { return this.#x; }
	set x(value) { this.#x = value; }
	get y() { return this.#y; }
	set y(value) { this.#y = value; }
	#xv = 0;
	#yv = 0;
	get xv() { return this.#xv; }
	set xv(value) { 
		this.#xv = value; 
		this.#facingEast = this.xv > 0;
		this.facingWest = this.xv <= 0;			
	}
	get yv() { return this.#yv; }
	set yv(value) { 
		this.#yv = value; 
		this.facingNorth = this.yv < 0;
		this.facingSouth = this.yv >= 0;
	}
	#faceingNorth = false;
	get facingNorth() { return this.#faceingNorth; }
	set facingNorth(value) { this.#faceingNorth = value; }
	#facingEast = false;
	get facingEast() { return this.#facingEast; }
	set facingEast(value) { this.#facingEast = value; }
	#facingSouth = true;
	get facingSouth() { return this.#facingSouth; }
	set facingSouth(value) { this.#facingSouth = value; }
	#facingWest = true;
	get facingWest() { return this.#facingWest; }
	set facingWest(value) { this.#facingWest = value; }

	constructor(attacker) {
		this.x = 0;
		this.y = 0;
		this.xv = 0;
		this.yv = 0;
		this.width = 20;
		this.height = 20;
		this.readyToRemove = false;
		this.attackSpeed = 0;
		this.attackLifeSpan = ATTACK_DEFAULT_LIFE;
		this.ang = -0.5 * Math.PI;
		this.attackSound = crashIntoConeSound;
		this.missSound = swordMissSound;
		this.attacker = attacker ? attacker : this;
		this.myBitmap = rockBulletPic;
		this.facingNorth = false;
		this.facingEast = false;
		this.facingSouth = true;
		this.facingWest = true;

		this.targetDirections = [
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
	}

	resetAttackModifiers(){
		const afw = this.attacker.width;
		const afh = this.attacker.height;
		const ahw = afw / 2;
		const ahh = afh / 2;
		const aqw = ahw / 2;
		const aqh = ahh / 2;
		// x and y match the direction while xv and yv are top, left, right, etc.????
		this.modNO = { x: -45, y: -45, xv: 1, yv: 1, targetDirText: "no" };
		// this.modNE = { x: -afw, y: -ahh, xv: 0, yv: -1, targetDirText: "top" };
		// this.modSE = { x: -ahw, y: -afh, xv: 1, yv: 0, targetDirText: "right" };
		// this.modSW = { x: -afw, y: -ahh, xv: 0, yv: 1, targetDirText: "bottom"};
		// this.modNW = { x: -afw, y: -afh, xv: -1, yv: 0, targetDirText: "left" };
		// this.modN = { x: -afw, y: -afw, xv: -1, yv: -1, targetDirText: "top left" };
		// this.modE = { x: -afw, y: -afh - ahh * 2, xv: 1, yv: -1, targetDirText: "top right" };
		// this.modS = { x: aqw, y: ahh, xv: 1, yv: 1, targetDirText: "bottom right" };
		// this.modW = { x: -afw - ahw, y: -afh, xv: -1, yv: 1, targetDirText: "bottom left" };
		this.modNE = { x: -afw, y: -ahh, xv: 1, yv: -1, targetDirText: "top right" };
		this.modSE = { x: -ahw, y: -afh, xv: 1, yv: 1, targetDirText: "bottom right" };
		this.modSW = { x: -afw, y: -ahh, xv: -1, yv: 1, targetDirText: "bottom left"};
		this.modNW = { x: -afw, y: -afh, xv: -1, yv: -1, targetDirText: "top left" };
		this.modN = { x: -afw, y: -afw, xv: 0, yv: -1, targetDirText: "top" };
		this.modE = { x: -afw, y: -afh - ahh * 2, xv: 1, yv: 0, targetDirText: "right" };
		this.modS = { x: aqw, y: ahh, xv: 0, yv: 1, targetDirText: "bottom" };
		this.modW = { x: -afw - ahw, y: -afh, xv: -1, yv: 0, targetDirText: "left" };

		this.attackModifiers = [
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
		this.resetAttackModifiers();
		this.facingNorth = false;
		this.facingEast = false;
		this.facingSouth = true;
		this.facingWest = true;
	}

	done(){
		return this.attackLifeSpan <= 0;
	}

	whereTarget(target, attacker=this.attacker){
		// if no attacker, set instance as attacker parameter and instance property
		if (attacker == undefined) { 
			attacker = this; 
			this.attacker = attacker;
			this.resetAttackModifiers();
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

		// attack cannot target itself and don't allow player to attack themselves
		var targetDir = { t: false, r: false, b: false, l: false };
		if (target && target !== this && 
			(attacker != playerOne || target != playerOne)
		) { 
			targetDir = {
				t: target.y < attacker.y, // from playerTopOfUs
				r: target.x > attacker.x, // from playerRightOfUs
				b: target.y > attacker.y, // from playerBottomOfUs
				l: target.x < attacker.x, // from playerLeftOfUs
			}
		}

		return targetDir;
	}
	
	attackFrom(attacker=this.attacker,onlyIfFacing=true){
		// set new attacker in cases of deflect attacks or used but unbroken projectiles
		this.attacker = attacker;
		this.resetAttackModifiers();

		if (this.attackModifiers.some( (am) => {
			if (attacker.facingNorth == am.n && attacker.facingEast == am.e && 
				attacker.facingSouth == am.s && attacker.facingWest == am.w)
			{
				this.xv = am.mod.xv * this.attackSpeed;
				this.yv = am.mod.yv * this.attackSpeed;
				this.x = attacker.x + am.mod.x;
				this.y = attacker.y + am.mod.y;

				const targetDir = this.whereTarget();
				const targetFound = 
					attacker == playerOne ||
					onlyIfFacing == false ||
					this.targetDirections.some( (dir) => {
						if (dir.t == targetDir.t && dir.r == targetDir.r && 
							dir.b == targetDir.b && dir.l == targetDir.l
						) {
							return (am.mod.targetDirText == dir.text);
						}
					});
				return targetFound;
			}
		})) {
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
	}	
	
	hitTest(target) {
		// calls target's collitionTest method, not this instance's
		if (!this.readyToRemove && target && target.collisionTest(this)) {
			if (this.attackSound) { 
				this.attackSound.play(); 
			}
			this.reset();
			return true;
		}
		return false;
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
	constructor(attacker) {
		super(attacker);
		this.attackSpeed = SHOT_SPEED;
		this.attackLifeSpan = SHOT_LIFE;
		this.myBitmap = rockBulletPic;
	}
}

class meleeAttackClass extends attackClass {
	constructor(attacker) {
		super(attacker);
		this.attackSpeed = MELEE_ATTACK_SPEED;
		this.attackLifeSpan = MELEE_ATTACK_LIFE;
		this.myBitmap = meleeAttackPic;
		this.attackSound = swordSwing2Sound;
	}
}
