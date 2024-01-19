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
            return i.priority - j.priority;
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
    let pathToHere = Array(ROOM_COLS * ROOM_ROWS).fill(null);
    let costToHere = Array(ROOM_COLS * ROOM_ROWS).fill(0);

    const max_loops = PATHFINDING_MAX_SEARCH_LOOPS;
    let pathIndex = 0;
    while (!frontier.empty() && pathIndex < max_loops) {
        let current = frontier.pick();
        const currentIndex = rowColToArrayIndex(current.tileCol, current.tileRow);

        if (current == goal) { break; }

        let neighbors = {
            n : { tileCol : current.tileCol, tileRow : current.tileRow - 1 },
            s : { tileCol : current.tileCol, tileRow : current.tileRow + 1 },
            e : { tileCol : current.tileCol + 1, tileRow : current.tileRow },
            w : { tileCol : current.tileCol - 1, tileRow : current.tileRow }
        };

        Object.entries(neighbors).forEach( ([_, next]) => {
            if (next.tileCol < 0 || next.tileCol >= ROOM_COLS ||
                next.tileRow < 0 || next.tileRow >= ROOM_ROWS) {
                return;
            }

            const nextIndex = rowColToArrayIndex(next.tileCol, next.tileRow);
            const newCost = costToHere[currentIndex] + gridArray[nextIndex] * GRID_WEIGHT_INFLUENCE_FACTOR;

            if (!costToHere.hasOwnProperty(next) || newCost < costToHere[next]) {
                // use new cost to get to the next tile
                costToHere[nextIndex] = newCost;
                const priority = newCost + heuristic(next, goal);
                frontier.join(next, priority);
                pathToHere[currentIndex] = nextIndex;
            }
        });

        pathIndex++;
    }

    return { path: pathToHere, cost: costToHere};
}
