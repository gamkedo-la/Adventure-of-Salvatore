class Direction {
    constructor(tileCol, tileRow, moveNorth, moveEast, moveSouth, moveWest) {
        this.#tileCol = tileCol;
        this.#tileRow = tileRow;
        this.#moveNorth = moveNorth;
        this.#moveEast = moveEast;
        this.#moveSouth = moveSouth;
        this.#moveWest = moveWest;
    }
	#moveNorth = false;
	#moveEast = false;
	#moveSouth = false;
	#moveWest = false;
	#tileCol = 0;
	#tileRow = 0;
	get moveNorth() { return this.#moveNorth; }
	get moveEast() { return this.#moveEast; }
	get moveSouth() { return this.#moveSouth; }
	get moveWest() { return this.#moveWest; }
	move(tileCol, tileRow) {
		if (this.#tileCol === tileCol && this.#tileRow === tileRow) {
			return { n : this.#moveNorth, e : this.#moveEast, s: this.#moveSouth, w: this.#moveWest };
		}
	}
};

const directionNoMove = new Direction(0, 0, false, false, false, false);
const directionN = new Direction(0, -1, true, false, false, false);
const directionNE = new Direction(1, -1, true, true, false, false);
const directionE = new Direction(1, 0, false, true, false, false);
const directionSE = new Direction(1, 1, false, true, true, false);
const directionS = new Direction(0, 1, false, false, true, false);
const directionSW = new Direction(-1, 1, false, false, true, true);
const directionW = new Direction(-1, 0, false, false, false, true);
const directionNW = new Direction(-1, -1, true, false, false, true);

// class DirectionN extends Direction(0, -1, true, false, false, false) {}
// class DirectionNE extends Direction(1, -1, true, true, false, false) {}
// class DirectionE extends Direction(1, 0, false, true, false, false) {}
// class DirectionSE extends Direction(1, 1, false, true, true, false) {}
// class DirectionS extends Direction(0, 1, false, false, true, false) {}
// class DirectionSW extends Direction(-1, 1, false, false, true, true) {}
// class DirectionW extends Direction(-1, 0, false, false, false, true) {}
// class DirectionNW extends Direction(-1, -1, true, false, false, true) {}

// get the direction
const directionOptions = [
	directionNoMove, 
	directionN,	directionNE,
	directionE,	directionSE,
	directionS,	directionSW,
	directionW,	directionNW,
];

