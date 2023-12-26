const FADE_WALLS_THAT_OBSCURE_PLAYER = false; // set to true for transparent walls
const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 85;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 45;
const ROOM_ROWS = 37;


var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelList = [levelOne, levelTwo];
var levelNow = 0;
var roomGrid = [];

var levelOne = [ 
	
	1, 11, 42, 43,  1,  1,  1, 42, 43,  1,  1, 42, 43,  1,  1, 42, 43,  1, 11,  1, 42, 43,  1, 11,  1, 42, 43,  1, 11,  1, 42, 43,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  
    1, 75, 51, 75, 52, 52,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1, 74,  0, 74,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0, 26, 26,  0,  0,  0,  0, 26, 26, 26, 26, 26,  0,  0,  0, 26, 26, 26, 26,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
   11, 71,  0,  0,  0,  0,  1,  0,  0, 80, 80, 80, 80,  1,  0, 31, 33, 36,  0,  0,  0, 31, 33, 33, 33, 33, 36,  0,  0, 31, 33, 33, 33, 36,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1, 44,  0,  0,  0,  0, 11,  0,  0, 80, 80, 80, 80, 78,  0, 31, 37, 35,  0,  0,  0, 31, 37, 36, 36, 36, 35,  0,  0, 31, 33, 36, 36, 35,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1, 76,  0,  0,  0,  0,  1,  0,  0, 80, 80, 80, 80,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1, 76,  0,  0,  0,  0,  1,  0,  0, 80, 80, 80,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1, 76,  0,  0,  0,  0, 11,  0,  0, 80, 80, 80,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  1,  1,  1, 11, 87,  1,  0,  0, 80, 80, 80,  0,  1,  1, 90,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11,  1,100, 84,100,  1,  1,  1,  1,  1,  1, 90,  1,  1,  1,
	1, 48, 47, 10,  0,  0,  1,  0,  0, 80, 80, 80,  0,  1,  0,  0,  0,  1, 44, 49, 48, 46, 47, 48, 47, 48, 46,  1, 60,  0,  0,  0, 68,  0,  0,  1, 59, 58, 57,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  1,  0,  0, 80, 80, 80,  0,  1,  0,  0,  0,  1, 13,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1, 58,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0, 11,  0,  0, 80, 80, 80,  0,  1,  0,  0,  0,  1, 44,  0,  0, 13,  0,  0, 13,  0,  0,  1,  0,  0, 24, 24,  0,  0,  0,  1, 57,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  0,  0,  0,  0,  0,  1, 80, 80, 80, 80, 80,  0,  1,  0,  0,  0,  1, 44,  0,  0, 45,  0, 49, 44,  0,  0,  1,  0, 28, 33, 36,  0,  0,  0,  1,  0,  0,  0, 51, 51, 51, 52, 51,  1,
	1, 14,  0,  0, 26,  0, 78, 80, 80, 80, 80, 80,  0,  1,  0,  0,  0,  1, 13,  0,  0, 13,  0,  0, 44,  0,  0, 11,  0, 28, 34, 34,  0,  0,  0,  1,  0,  0,  0, 52,  0,  0,  0,  0,  1,
	1, 15,  0, 31, 77,  0,  1, 80, 80, 80, 80, 80,  0,  1,  0,  0,  0,  1, 44,  0,  0, 44,  0, 10, 13,  0,  0,  1,  0, 28, 37, 35,  0,  0,  0, 78,  0,  0,  0, 51,  0,  0,  0,  0, 99,
    1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1, 13,  0, 10, 49,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 51,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1, 14,  0,  0,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 52, 51,  0, 52, 52,  1,
    1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1, 15,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1, 11,  1,  1, 11,  1,  1, 11,  1, 87,  1,  1,  1,  1,  1, 11,  1,  1,  1,  1,  1,  1, 84,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11,  1,  1,  1,  0,  0,  0,  0,  0,  1,
	1, 59, 59, 59, 60, 53, 56, 54, 53, 55,  0,  0,  0,  1, 53, 54, 55, 56,  0,  0,  1, 27, 27,  0,  0, 52, 51, 57,  0, 57,  1, 75,  0,  0, 75,  0, 75,  0,  1,  1,  1, 87,  1,  1,  1,
	1, 59, 59,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 74,  0,  0, 74,  0, 74,  0,  1,  0,  0,  0,  0,  0,  1,
   11,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1, 52,  0,  0,  0,  0,  0,  0,  0,  0,  1, 76,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0, 99,
	1,  0, 75,  0, 75,  0, 75,  0, 75,  0,  0,  0,  0, 11,  0,  0,  0,  0,  0,  0,  1, 51,  0,  0,  0,  0,  0,  0,  0,  0,  1, 76,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1,  0, 74,  0, 74,  0, 74,  0, 74,  0,  0,  0,  0,  1, 52,  0,  0,  0,  0,  0,  3,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 76,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 51,  0,  0, 24,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11,  0,  0,  0,  0, 27,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 52,  0,  0, 77,  0,  0,  1, 51,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 32, 77,  0,  0,  1,  0,  0,  0,  0,  0,  1,
    1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1, 52,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1,  0, 75,  0, 75,  0, 75,  0, 75,  0,  0,  0,  0,  1, 57,  0,  0,  0,  0,  0,  1, 52,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,	
	1,  0, 74,  0, 74,  0, 74,  0, 74,  0,  0,  0,  0,  1, 11,  1,  1,  1, 11,  1,  1, 11,  1, 87,  1, 11,  1, 11,  1, 11,  1,  8,  1, 76,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 12, 12, 12,  1,  0,  0,  0,  0,  0,  1, 27, 27, 27,  0,  0,  1, 76,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 97,  0,  1,  0,  0,  0,  0,  0,  1, 76,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0, 99,
    1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 79,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  1, 72,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  2,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1, 70,  0,  0,  0,  0,  1,  0, 70,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1, 76,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,
	1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1,  1,  1, 99, 99,  1,  1,  1, 99,  1, 96, 98,  1,  1,  1,  1, 99,  1,  1,  1,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1
]; 																							//2
					
var levelTwo = [

	1, 11, 42, 43,  1,  1,  1, 42, 43,  1,  1, 42, 43,  1,  1, 42, 43,  1, 11,  1, 42, 43,  1, 11,  1, 42, 43,  1, 11,  1,  1,  1,  1, 99,  1,  1,  1,  1,  1,  1, 99,  1,  1,  1,  1,  
    1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1, 87,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 87,  1,  1,  1,  1, 87,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,103,101,102,101,103,  1,  1,  1,  1, 66,104,  1,104,  1,104,  1,  1,  1,  1,  1,  1,  1, 87,  1,  1,  1,  1,  1,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,103,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,101,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,103,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,101,  0,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,103,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,104,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,	
	1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1,100, 87,100,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 87,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 87,  1,  1,  1,  1,  1,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
    1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 22, 22,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0, 78,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 99,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1, 99,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1,  1,  1,  1, 99,  1,  1,  1,  1, 99,  1,  1];
					
	const TILE_ROAD = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_YELLOW_DOOR = 3;
	const TILE_FINISH = 4;
	const TILE_RED_DOOR = 6;
	const TILE_BLUE_DOOR = 7;
	const TILE_TREASURE = 8;
	const TILE_MINICYCLOP = 9;
	const TILE_TABLE = 10;
	const TILE_WALL_WITH_TORCH = 11;
	const TILE_STAIRS = 12;
	const TILE_BOOKSHELF = 13;
	const TILE_FIRE_PLACE_2 = 14;
	const TILE_FIRE_PLACE = 15;
	const TILE_ORC = 16;
	const TILE_OGRE = 17;
	const TILE_PITTRAP_ARMED = 18;
	const TILE_PITTRAP_UNARMED = 19;
	const TILE_SPIKES_ARMED = 20;
	const TILE_SPIKES_UNARMED = 21;
	const TILE_STAIRS_DOWN = 22;
	const TILE_RAT = 23;
	const TILE_CHAIR = 24; //basic chair
	const TILE_CHAIR2 = 25;
	const TILE_CHAIR3 = 26; //green chair
	const TILE_CHAIR4 = 27; //blue chair
	const TILE_CHAIR5 = 28; //basic chair
	const TILE_CHAIR6 = 29;
	const TILE_CHAIR7 = 30;
	const TILE_CHAIR8 = 31; //green chair
	const TILE_CHAIR9 = 32; //blue chair
	const TILE_TABLE1 = 33;
	const TILE_TABLE2 = 34;
	const TILE_TABLE3 = 35;
	const TILE_TABLE4 = 36;
	const TILE_TABLE5 = 37;
	const TILE_CHAIR10 = 38;
	const TILE_CHAIR11 = 39;
	const TILE_WALL_TRAP = 40;
	const TILE_WALL_TRAP2 = 41;
	const TILE_CURTAIN = 42;
	const TILE_RIGHT_CURTAIN = 43;
	const TILE_BOOKSHELF_2 = 44;
	const TILE_BOOKSHELF_3 = 45;
	const TILE_BOOKSHELF_4 = 46;
	const TILE_BOOKSHELF_5 = 47;
	const TILE_BOOKSHELF_6 = 48;
	const TILE_BOOKS = 49;
	const TILE_WEAPON_RACK = 50;
	const TILE_STORAGEBOX = 51;
	const TILE_STORAGEBOX_2 = 52;
	const TILE_WEAPON_RACK_2 = 53;
	const TILE_WEAPON_RACK_3 = 54;
	const TILE_WEAPON_RACK_4 = 55;
	const TILE_WEAPON_RACK_5 = 56;
	const TILE_BARREL = 57;
	const TILE_BARREL_2 = 58;
	const TILE_BARREL_3 = 59;
	const TILE_BARREL_4 = 60;
	const TILE_POTATO_SACK = 61;
	const TILE_HEALING_POTION = 62;
	const TILE_SPEED_POTION = 63;
	const TILE_COIN = 64;
	const TILE_WALL_LEVER_1 = 65;
	const TILE_WALL_LEVER_2 = 66;
	const TILE_WALL_3 = 67;
	const TILE_KEY_YELLOW = 68;
	const TILE_KEY_RED = 69;
	const TILE_KEY_BLUE = 70;
	const TILE_KEY_GREEN = 71;
	const TILE_POT_GREEN = 72;
	const TILE_COLUMN = 73;
	const TILE_BED_1 = 74;
	const TILE_BED_2 = 75;
	const TILE_WARDROB = 76;
	const TILE_TABLE6 = 77;
	const TILE_WOOD_DOOR = 78;
	const TILE_GREEN_DOOR = 79;
	const TILE_RED_CARPET = 80;
	const TILE_GREEN_DOOR_2 = 81;
	const TILE_GREEN_DOOR_OPEN = 82;
	const TILE_GREEN_DOOR_2_OPEN = 83;
	const TILE_BLUE_DOOR_2 = 84;
	const TILE_BLUE_DOOR_OPEN = 85;
	const TILE_BLUE_DOOR_2_OPEN = 86;
	const TILE_WOOD_DOOR_2 = 87;
	const TILE_WOOD_DOOR_OPEN = 88;
	const TILE_WOOD_DOOR_2_OPEN = 89;
	const TILE_YELLOW_DOOR_2 = 90;
	const TILE_YELLOW_DOOR_OPEN = 91;
	const TILE_YELLOW_DOOR_2_OPEN = 92;
	const TILE_RED_DOOR_2 = 93;
	const TILE_RED_DOOR_OPEN = 94;
	const TILE_RED_DOOR_2_OPEN = 95;
	const TILE_OUTSIDE_DOOR = 96;
	const TILE_BLOB = 97;
	const TILE_OUTSIDE_DOOR_2 = 98;
	const TILE_OUTSIDE_WINDOW = 99;
	const TILE_WALL_BANNER = 100;
	const TILE_WALL_4 = 101;
	const TILE_WALL_5 = 102;
	const TILE_WALL_6 = 103;
	const TILE_WALL_SKELETON = 104;

const UNWALKABLE_TILES = [ // we won't even try to walk into these - we never collide into them
	undefined,
    TILE_WALL,
	TILE_TABLE,
	TILE_WALL_WITH_TORCH,
	TILE_BOOKSHELF,
	TILE_FIRE_PLACE_2,
	TILE_FIRE_PLACE,
	TILE_CHAIR,
	TILE_CHAIR2,
	TILE_CHAIR3,
	TILE_CHAIR4,
	TILE_CHAIR5,
	TILE_CHAIR6,
	TILE_CHAIR7,
	TILE_CHAIR8,
	TILE_CHAIR9,
	TILE_TABLE1,
	TILE_TABLE2,
	TILE_TABLE3,
	TILE_TABLE4,
	TILE_TABLE5,
	TILE_CHAIR10,
	TILE_CHAIR11,
	TILE_CURTAIN,
	TILE_RIGHT_CURTAIN,
	TILE_BOOKSHELF_2,
	TILE_BOOKSHELF_3,
	TILE_BOOKSHELF_4,
	TILE_BOOKSHELF_5,
	TILE_BOOKSHELF_6,
	TILE_BOOKS,
	//TILE_WEAPON_RACK,
	//TILE_STORAGEBOX,
	//TILE_STORAGEBOX_2,
	//TILE_WEAPON_RACK_2,
	//TILE_WEAPON_RACK_3,
	//TILE_WEAPON_RACK_4,
	//TILE_WEAPON_RACK_5,
	TILE_BARREL,
	TILE_BARREL_2,
	TILE_BARREL_3,
	TILE_BARREL_4,
	TILE_POTATO_SACK,
    TILE_WALL_3,
	TILE_COLUMN,
	TILE_BED_1,
	TILE_BED_2,
	TILE_WARDROB,
	TILE_TABLE6,
];

const tile_items = [
    TILE_COIN,
    TILE_HEALING_POTION,
    TILE_SPEED_POTION,
    TILE_KEY_GREEN,
    TILE_KEY_BLUE,
    TILE_KEY_RED,
    TILE_KEY_YELLOW,
];
	
function gameCoordToIsoCoord (pixelX, pixelY){
	var camPanX = -350;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;
	
	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}	

function tileCoordToIsoCoord(tileC, tileR ){
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
}
					
// fill in the blank areas behind the map
function drawWorldBackground(){
    // fixme: calculate cols+rows based on world size
    let cols=8;
    let rows=8;
    let bgw=256;
    let bgh=256;
    // heinous hack kludge: the camera moves in floating point and causes seams unless we slightly overlap
    // fixed by locking camera coords to integers
    // bgw-=0.5;
    // bgh-=0.5;
    for (let x=0; x<cols; x++) {
        for (let y=0; y<rows; y++) {
            canvasContext.drawImage(worldBackgroundPic,x*bgw,y*bgh);
        }
    }
}

function drawFloor(){	
	for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {

			var tileTypeHere = TILE_ROAD;
			var tileIndex = eachRow * ROOM_COLS + eachCol;
			var trackTypeHere = roomGrid[tileIndex];
			if (trackTypeHere == TILE_RED_CARPET) {
				tileTypeHere = trackTypeHere;
			}

			tileCoordToIsoCoord(eachCol, eachRow);
			canvasContext.drawImage(trackPics[tileTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
		} // end of each col
	} // end of each row
}

function drawAt(currentRow, currentCol){
	if (currentRow >= ROOM_ROWS || currentCol >= ROOM_COLS) return;

	var tileIndex = currentRow * ROOM_COLS + currentCol;
	var tileLeftEdgeX = 7 + ROOM_W * currentCol;
	var tileTopEdgeY = ROOM_H * currentRow;
	var eachRow = currentRow;
	var eachCol = currentCol;
	
	var trackTypeHere = roomGrid[tileIndex];
	if (trackTypeHere == TILE_ROAD || trackTypeHere == TILE_RED_CARPET) return;
	isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
	isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
	tileCoordToIsoCoord(eachCol, eachRow);
	
    if (tile_items.includes(trackTypeHere)) {
        canvasContext.save();
        canvasContext.translate(isoDrawX + ISO_GRID_W/8, isoDrawY - ISO_GRID_H/2);
        canvasContext.scale(1, 0.5);
        canvasContext.rotate((45 * Math.PI) / 180);
        canvasContext.translate(-isoDrawX + ISO_GRID_W/4, -isoDrawY + ISO_GRID_H/2);
        colorRect(
            isoDrawX - ISO_GRID_W/4, 
            isoDrawY - ISO_GRID_H/4, 
            ISO_GRID_W/2, 
            ISO_GRID_H, 
            'black', 
            0.2
        );
        canvasContext.restore();
    }
	if(trackTypeHere == TILE_WALL_WITH_TORCH){
		canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
		
		var torchFrames = 4;
		var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
		
		canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
		animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
		isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
	} else if (trackTypeHere == TILE_HEALING_POTION){
		var itemFrames = 4;
		var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % itemFrames;
		
		canvasContext.drawImage(trackPics[TILE_HEALING_POTION],
		animOffset * ISO_TILE_DRAW_W, 
		40, 
		ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
		isoDrawX - ISO_GRID_W/2, 
		isoDrawY - ISO_TILE_GROUND_Y, 
		ISO_TILE_DRAW_W, 
		ISO_TILE_DRAW_H);
	} else if (	trackTypeHere == TILE_KEY_BLUE ||
				trackTypeHere == TILE_KEY_YELLOW ||
				trackTypeHere == TILE_KEY_GREEN ||
				trackTypeHere == TILE_KEY_RED){
		var itemFrames = 4;
		var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % itemFrames;
		
		canvasContext.drawImage(trackPics[trackTypeHere],
		animOffset * ISO_TILE_DRAW_W, 
		40, 
		ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
		isoDrawX - ISO_GRID_W/2, 
		isoDrawY - ISO_TILE_GROUND_Y, 
		ISO_TILE_DRAW_W, 
		ISO_TILE_DRAW_H);
	} else if (trackTypeHere == TILE_SPEED_POTION){
		var itemFrames = 4;
		var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % itemFrames;
		
		canvasContext.drawImage(trackPics[TILE_SPEED_POTION],
		animOffset * ISO_TILE_DRAW_W, 
		40, 
		ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
		isoDrawX - ISO_GRID_W/2, 
		isoDrawY - ISO_TILE_GROUND_Y, 
		ISO_TILE_DRAW_W, 
		ISO_TILE_DRAW_H);
	} else if (trackTypeHere == TILE_COIN){
		var itemFrames = 8;
		var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % itemFrames;
		
		canvasContext.drawImage(trackPics[TILE_COIN],
		animOffset * ISO_TILE_DRAW_W, 
		40, 
		ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
		isoDrawX - ISO_GRID_W, 
		isoDrawY - ISO_TILE_GROUND_Y, 
		ISO_TILE_DRAW_W, 
		ISO_TILE_DRAW_H);
		
	} else if (trackTypeHere == TILE_WALL_TRAP ||
			   trackTypeHere == TILE_WALL_TRAP2 ||
			   trackTypeHere == TILE_WALL_LEVER_1 ||
			   trackTypeHere == TILE_WALL_LEVER_2){
		canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
		canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
	} else if(trackTypeHere == TILE_WALL && isBlockingSightOfPlayer(tileLeftEdgeX, tileTopEdgeY)){
		if (FADE_WALLS_THAT_OBSCURE_PLAYER) {
            canvasContext.globalAlpha = 0.3;
        }
		canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
		canvasContext.globalAlpha = 1.0;
	} else if (trackTypeHere > TILE_ROAD){
		canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
	}
}

//This function will not be required when layers are drawn - Vince 10/23/23
function tileTypeHasRoadTransparency(checkTileType) {
	return (checkTileType == TILE_BOOKSHELF ||
		    checkTileType == TILE_BOOKSHELF_2 ||
			checkTileType == TILE_BOOKSHELF_3 ||
			checkTileType == TILE_BOOKSHELF_4 ||
			checkTileType == TILE_BOOKSHELF_5 ||
			checkTileType == TILE_BOOKSHELF_6 ||
			checkTileType == TILE_BOOKS ||
			checkTileType == TILE_WEAPON_RACK ||
			checkTileType == TILE_WEAPON_RACK_2 ||
			checkTileType == TILE_WEAPON_RACK_3 ||
			checkTileType == TILE_WEAPON_RACK_4 ||
			checkTileType == TILE_WEAPON_RACK_5 ||
			checkTileType == TILE_STORAGEBOX ||
			checkTileType == TILE_STORAGEBOX_2 ||
			checkTileType == TILE_WEAPON_RACK ||
			checkTileType == TILE_PITTRAP_UNARMED ||
			checkTileType == TILE_SPIKES_UNARMED  ||
			checkTileType == TILE_BARREL ||
			checkTileType == TILE_BARREL_2 ||
			checkTileType == TILE_BARREL_3 ||
			checkTileType == TILE_BARREL_4 ||
			checkTileType == TILE_POTATO_SACK ||
			checkTileType == TILE_FIRE_PLACE ||
			checkTileType == TILE_HEALING_POTION ||
			checkTileType == TILE_SPEED_POTION ||
			checkTileType == TILE_FIRE_PLACE_2 ||
			checkTileType == TILE_COIN ||
			checkTileType == TILE_KEY_BLUE ||
			checkTileType == TILE_KEY_GREEN ||
			checkTileType == TILE_KEY_RED ||
			checkTileType == TILE_KEY_YELLOW ||
			checkTileType == TILE_POT_GREEN ||
			checkTileType == TILE_CHAIR ||
			checkTileType == TILE_CHAIR2 ||
			checkTileType == TILE_CHAIR3 ||
			checkTileType == TILE_CHAIR4 ||
			checkTileType == TILE_CHAIR5 ||
			checkTileType == TILE_CHAIR6 ||
			checkTileType == TILE_CHAIR7 ||
			checkTileType == TILE_CHAIR8 ||
			checkTileType == TILE_CHAIR9 ||
			checkTileType == TILE_CHAIR10 ||
			checkTileType == TILE_CHAIR11 ||
			checkTileType == TILE_TABLE ||
			checkTileType == TILE_TABLE1 ||
			checkTileType == TILE_TABLE2 ||
			checkTileType == TILE_TABLE3 ||
			checkTileType == TILE_TABLE4 ||
			checkTileType == TILE_TABLE5 ||
			checkTileType == TILE_TREASURE ||
			checkTileType == TILE_POT_GREEN ||
			checkTileType == TILE_COLUMN 
			);
}


function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			
		
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
					
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow); 
	//console.log("X: "+pixelX+ " Y: "+pixelY+ " col: " + tileCol + " row: " + tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		
			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}
			
function isBlockingSightOfPlayer(x, y) {
	return  playerOne.x < x + 50 &&
			playerOne.x > x - 250 &&
			playerOne.y < y && 
			playerOne.y > y -100;
}
