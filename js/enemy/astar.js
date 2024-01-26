function aStarSearch(gridArray, base, goal) {
	// A* using the following as a reference
	// https://www.redblobgames.com/pathfinding/a-star/implementation.html
	// Differences from Dijkstra's and A* can be found in the "Algorithm Changes" section
	// https://www.redblobgames.com/pathfinding/a-star/implementation.html#algorithm
	function heuristic( first, second ) {
		// Manhattan distance
		const value = 
		  Math.abs(first.tileCol - second.tileCol) +
		  Math.abs(first.tileRow - second.tileRow); 
		return value;
	}
	class PriorityQueue {
		#data = [];

		#prioritize(i, j) {
			const diff = i.priority - j.priority;
			return diff != 0 ? diff : Math.random() < 0.5 ? -1 : 1;
		}

		join(element, priority) {
			this.#data.push({element, priority});
		}

		pick() {
			this.#data.sort(this.#prioritize);
			return this.#data.shift().element;
		}

		empty() {
			return this.#data.length == 0;
		}
	}

	let frontier = new PriorityQueue();
	frontier.join(base, 0);
	let pathToHere = Array(ROOM_COLS * ROOM_ROWS).fill(-1);
	let costToHere = Array(ROOM_COLS * ROOM_ROWS).fill(0);
	let directions = [
		{ dx: 0, dy: -1 },
		{ dx: 1, dy: -1 },
		{ dx: 1, dy: 0 },
		{ dx: 1, dy: 1 },
		{ dx: 0, dy: 1 },
		{ dx: -1, dy: 1 },
		{ dx: -1, dy: 0 },
		{ dx: -1, dy: -1 },
		{ dx: 0, dy: 0 },
	];

	var lastIndex = -1;
	const max_loops = PATHFINDING_MAX_SEARCH_LOOPS;
	let counter = 0;
	while (!frontier.empty() && counter < max_loops) {
		let current = frontier.pick();
		const currentIndex = rowColToArrayIndex(current.tileCol, current.tileRow);

		if (current.tileCol == goal.tileCol &&
			current.tileRow == goal.tileRow) { break; }

		for (let { dx, dy } of directions) {
			let next = { tileCol: current.tileCol + dx, tileRow: current.tileRow + dy };

			if (next.tileCol < 0 || next.tileCol >= ROOM_COLS ||
				next.tileRow < 0 || next.tileRow >= ROOM_ROWS) {
				continue;
			}

			const nextIndex = rowColToArrayIndex(next.tileCol, next.tileRow);
			let nextTileCost = 0;
			switch(gridArray[nextIndex]) {
				case TILE_ROAD:
				case TILE_SPEED_POTION:
				case TILE_KEY_BLUE:
				case TILE_KEY_GREEN:
				case TILE_KEY_RED:
				case TILE_KEY_YELLOW:
				case TILE_TREASURE:
				case TILE_FINISH:
				case TILE_WOOD_DOOR_OPEN:
				case TILE_YELLOW_DOOR_OPEN:
				case TILE_YELLOW_DOOR_2_OPEN:
				case TILE_BLUE_DOOR_OPEN:
				case TILE_BLUE_DOOR_2_OPEN:
				case TILE_GREEN_DOOR_OPEN:
				case TILE_GREEN_DOOR_2_OPEN:
				case TILE_RED_DOOR_OPEN:
				case TILE_WOOD_DOOR_2_OPEN:
				case TILE_RED_CARPET:
				case TILE_SPIKES_UNARMED:	
				case TILE_PITTRAP_UNARMED:
				case TILE_TREASURE:	
				case TILE_KEY_YELLOW:	
				case TILE_KEY_BLUE:	
				case TILE_KEY_GREEN:	
				case TILE_KEY_RED:
				case TILE_HEALING_POTION:
				case TILE_SPEED_POTION:
				case TILE_COIN:
				case TILE_WALL_LEVER_1:
				case TILE_WALL_LEVER_2:


					nextTileCost = 1;
					break;					
				default:
					nextTileCost = gridArray[nextIndex] * GRID_WEIGHT_INFLUENCE_FACTOR;
					break;
			} 
	
			const newCost = costToHere[currentIndex] + nextTileCost;

			if ((newCost > 0 && costToHere[nextIndex] === 0) || 
				newCost < costToHere[nextIndex]
			) {
				// use new cost to get to the next tile
				costToHere[nextIndex] = newCost;
				const priority = newCost + heuristic(next, goal);
				frontier.join(next, priority);
				pathToHere[nextIndex] = currentIndex;
				lastIndex = nextIndex;
			}
		}

		counter++;
	}

	const pathToLast = (() => {	
		const baseIndex = rowColToArrayIndex(base.tileCol, base.tileRow);
		let pathToLast = Array(ROOM_COLS * ROOM_ROWS).fill(-1);
		let nextIndex = lastIndex;
		let currentIndex = nextIndex > -1 ? pathToHere[nextIndex] : -1;
		while (currentIndex > -1 && currentIndex != baseIndex) {
			pathToLast[currentIndex] = nextIndex;
			nextIndex = currentIndex;
			currentIndex = pathToHere[nextIndex];
		}
		pathToLast[currentIndex] = nextIndex;
		return pathToLast;
	})();

	return { path: pathToLast, cost: costToHere };
	// return { path: pathToHere, cost: costToHere };
}