const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 85;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 35;
const ROOM_ROWS = 24;


var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelList = [levelOne, levelTwo];
var levelNow = 0;
var roomGrid = [];

/*var levelOne = [
					 1,11, 1,11, 1,11,42,43, 41, 1, 1,42,43, 1, 1,42,43, 1, 1, 1, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1, 1,
					 1,12, 5, 0, 0, 0, 0, 0, 0,23,18, 0,20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1, 
					11, 2, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1, 0, 0, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 6, 1, 
					 1, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 1,13,27,26, 0, 0,25,24,26, 0, 1, 0, 0, 0, 0, 0, 0,51,50,50,50,52,51,51, 1, 
					11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,24,24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					40, 0, 0, 1, 1, 6, 1, 1, 3, 1, 1, 1, 1, 1, 7, 1,44, 0, 0, 0, 0, 0, 0, 0, 0, 1,28,33,36,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 9, 0, 1, 1, 0,10, 1, 0,14,10, 1,10,15, 0, 1,45, 0, 0, 0, 9, 0, 0, 0, 0, 1,29,33,33,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 5, 0, 0, 1,44, 0, 0, 0, 0, 0, 0, 0, 0, 1,30,33,34,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1, 1, 0, 0, 1, 0, 8, 0, 1, 0, 0, 0, 1,13,22, 0, 0, 0, 0, 0, 0, 0, 1,31,33,33,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 9, 1, 5, 0, 0, 1, 0, 0, 0, 1,44, 0, 0, 0, 0, 0, 0, 0, 0, 1,32,37,35,39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 8, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1, 				
					 1, 0, 0, 1,13, 0, 4, 0, 0, 1, 0, 0, 0, 0, 0, 1,45,49,10, 0,46,47,48,47,46, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 1,13, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 1,44, 0, 0, 0, 0, 0, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,44, 0, 0, 0, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,45, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,44, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,28, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11,29, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					]; */

var levelOne = [
	
	1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11,  1,  1, 11,  1, 11, 42, 43, 11,  1, 11, 42, 43, 11,  1, 43,  1,  1,  1,  1,  1,  1,  1,  1,  
    1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 58,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 59, 57, 61, 61,  0,  0,  0,  0,  0,  1,
	1,  0, 24, 24, 24, 24, 24,  0,  1,  0,  0,  2,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 60,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 58,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0, 24, 24, 24, 24, 24,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0, 30, 33, 36, 39,  0,  0,  1,  0,  0,  0, 51, 51, 51, 52,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0, 30, 33, 33, 39,  0,  0,  1,  0,  0,  0, 51, 61,  0, 52,  0,  0,  1,
	1,  0, 24, 24, 24, 24, 24,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0, 30, 33, 34, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 30, 33, 33, 39,  0,  0,  1,  0,  0,  0, 51,  0,  0,  0,  0,  0,  1,
	1,  0, 24, 24, 24, 24, 24,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0, 30, 37, 35, 39,  0,  0,  1, 57,  0,  0, 52,  0,  0, 52,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 59,  0,  0, 51, 52, 52, 51,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 60,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 60,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
	1, 57, 61, 60,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 13, 49, 47, 46, 45, 47, 48, 46, 47, 47,  1, 56, 50,  8, 50, 53, 54, 55,  0,  0,  1,
	1, 59,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 13,  0,  0,  0, 44,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1, 59,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 44,  0,  0,  0, 44,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 45,  0,  0,  0, 44,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 44,  0, 10,  0,  0,  0,  0, 49,  0,  0,  1,  0,  0,  0, 51, 51, 51,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 52,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1, 45,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0, 52,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 13,  0,  0,  0, 45,  0,  0, 44,  0,  0,  1,  0,  0,  0, 51, 52, 52,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 44,  0,  0,  0, 44,  0,  0, 13,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1, 44,  0,  0,  0, 44,  0,  0, 13,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,
	1,  0,  0,  0,  0,  0,  0,  0,  1, 11,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
]; 
					
var levelTwo = [
					 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1,11, 1, 1,
					 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,0, 0,20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1,11, 1,11, 7,11, 1,11, 1,11, 1,11, 1, 0, 0, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 6, 1, 
					 1,12, 0, 0, 0, 0, 0, 1, 0, 0, 0,24, 0, 0, 0, 1,13, 0,10, 0, 0, 0,24, 0, 0, 1, 0,24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1,28, 0, 9, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 7, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 1, 1, 1, 1, 0,14,10, 1,10,15, 0, 1,13, 0, 0, 0, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 5, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 1, 0, 0, 0, 0, 8, 0, 1, 0, 0, 0, 1,13,22, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 1, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 8, 0, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 				
					 1, 1, 7, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,13, 0,10, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					11, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13, 0, 0, 0, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,28, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					 1, 0, 0, 0, 1,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
					];
					
	const TILE_ROAD = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_YELLOW_DOOR = 3;
	const TILE_FINISH = 4;
	const TILE_YELLOW_KEY = 5;
	const TILE_RED_DOOR = 6;
	const TILE_BLUE_DOOR = 7;
	const TILE_TREASURE = 8;
	const TILE_GOBLIN = 9;
	const TILE_TABLE = 10;
	const TILE_WALL_WITH_TORCH = 11;
	const TILE_STAIRS = 12;
	const TILE_BOOKSHELF = 13;
	const TILE_FIRE_PLACE_LIT = 14;
	const TILE_FIRE_PLACE = 15;
	const TILE_ORC = 16;
	const TILE_OGRE = 17;
	const TILE_PITTRAP_ARMED = 18;
	const TILE_PITTRAP_UNARMED = 19;
	const TILE_SPIKES_ARMED = 20;
	const TILE_SPIKES_UNARMED = 21;
	const TILE_STAIRS_DOWN = 22;
	const TILE_RAT = 23;
	const TILE_CHAIR = 24;
	const TILE_CHAIR2 = 25;
	const TILE_CHAIR3 = 26;
	const TILE_CHAIR4 = 27;
	const TILE_CHAIR5 = 28;
	const TILE_CHAIR6 = 29;
	const TILE_CHAIR7 = 30;
	const TILE_CHAIR8 = 31;
	const TILE_CHAIR9 = 32;
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
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	sharedAnimCycle++;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 7;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			tileCoordToIsoCoord(eachCol, eachRow);	
			
			if( tileTypeHasRoadTransparency(trackTypeHere) ) {
				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			}
			//need a helper function here to eliminate the else if
			if(trackTypeHere == TILE_WALL_WITH_TORCH){
				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
			} else if (trackTypeHere == TILE_WALL_TRAP ||
					   trackTypeHere == TILE_WALL_TRAP2){
				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);

			} else if (trackTypeHere == TILE_FIRE_PLACE_LIT){
				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				
				var torchFrames = 4;
				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;
				
				canvasContext.drawImage(trackPics[TILE_FIRE_PLACE_LIT],
				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H, 
				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
				
			} else {
				if(trackTypeHere == TILE_WALL &&
					playerOne.x < tileLeftEdgeX + 50 &&
					playerOne.x > tileLeftEdgeX - 250 &&
					playerOne.y < tileTopEdgeY && 
					playerOne.y > tileTopEdgeY -100){
					canvasContext.globalAlpha = 0.3;
					canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				} else {
					canvasContext.globalAlpha = 1.0;
					canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
				}
			}
            tileIndex++;
		} // end of each col
		tileTopEdgeY += ROOM_H;
	} // end of each row
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
			checkTileType == TILE_POTATO_SACK
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
			