//All Global variables and constants located here.

blobNames = ["Ooze"];
orcNames = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6"];     
ogreNames = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6"];    
miniCyclopNames = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz", 
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm", 
				"Kiok", "Wrokx", "Fiog", "Goziord"];
ratNames = [ "rat"];
rogueNames = ["Artemis"];

const GRID_WEIGHT_INFLUENCE_FACTOR = 50000;
const PATHFINDING_PATH_LIFETIME = 10;
const PATHFINDING_MAX_SEARCH_LOOPS = 250;
const RANDOM_MOVEMENT_TIMER_MAX = 12;

const DIR_N = 1;
const DIR_NE = 2;
const DIR_E = 3;
const DIR_SE = 4;
const DIR_S = 5;
const DIR_SW = 6;
const DIR_W = 7;
const DIR_NW = 8;
const DIR_NO = 9;

const ISO_CHAR_FOOT_Y = 8;
const ISO_SHADOW_OFFSET_Y = 5;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)
// this is at 0 because it makes it very hard to get through doors, 
// but at around 15 or 20 there's no more wall pop-in...
const PLAYER_COLLISION_RADIUS = 20; // don't stand too close to things (avoid wall popping in front of player)

const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;
const MELEE_ATTACK_SPEED = 8.0;
const MELEE_ATTACK_LIFE = 2;
const ATTACK_DEFAULT_LIFE = 0;
const TRAP_COOL_DOWN_DELAY = 120;
const DAMAGE_RECEIVED_DELAY = 120;
const MELEE_ATTACK_DELAY = 80;
const RANGE_ATTACK_DELAY = 60;
const DAMAGE_DEFAULT = 1;

var camPanX = 0;
var camPanY = 0;

var warriorPic = document.createElement("img");
var warriorAttackingPic = document.createElement('img');
var miniCyclopPic = document.createElement("img");
var roguePic = document.createElement("img");
var blobPic = document.createElement("img");
var skeletonPic = document.createElement("img");
var kregPic = document.createElement("img");
var shadowPic = document.createElement("img");
var feedbackGUIPic = document.createElement("img");
var coinGUIPic = document.createElement("img");
var healthbarPic = document.createElement("img");
var healthPic = document.createElement("img");
var rockBulletPic = document.createElement("img");
var worldBackgroundPic = document.createElement("img");
var guiBorderPic = document.createElement("img");
var guiButtonPic = document.createElement("img");
var guiPotionHolderPic = document.createElement("img");
var guiCompassPic = document.createElement("img");
var itemBackgroundPic = document.createElement("img");
var worldMapPic = document.createElement("img");
var meleeAttackPic = document.createElement("img");
var mainScreenBackgroundPic = document.createElement("img");
var mainScreenSwordPic = document.createElement('img'); 
var theAdventureOfSalvatorePic = document.createElement('img');
var deathScenePic = document.createElement('img');

var vignetteBorderPic = document.createElement("img");
const VIGNETTE_BORDER_OPACITY = 0.8; // how dark the black border is

//var titlepagePic = document.createElement("img");
var trackPics = [];
var picsToLoad = 0;

const MINIMAP_GUI_X = 630;
const MINIMAP_GUI_Y = 6;
const MINIMAP_GUI_W = 50;
const MINIMAP_GUI_H = 320; // is this too big?
const MINIMAP_DOT_W = 4;
const MINIMAP_DOT_H = 4;
const MINIMAP_OPACITY = 1;

var minimapCanvas = document.createElement("canvas");
var minimapContext = minimapCanvas.getContext("2d");
var minimapFrameCount = 0;

var smokeList = [];

var audioFormat;
var isMuted = false;
var soundSetforMeetings = false; //make false to hear at normal level
var deathTimer = 0;
var playDeathScene = false;

const KEY_W = 87; 
const KEY_S = 83; 
const KEY_A = 65; 
const KEY_D = 68; 
const KEY_B = 66; //Mute
const KEY_M = 77; //Menu
const KEY_N = 78; //Map
const KEY_P = 80; //Pause
const KEY_I = 73; //Items

const KEY_Z = 90;
const KEY_X = 88;
const KEY_C = 67;

const KEY_SPACEBAR = 32; 
const KEY_1 = 49;
const KEY_2 = 50;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;


var MousePosX = 0;
var MousePosY = 0;
var MouseIsHeldDown = false;
var MouseJustClicked = false;

var displayQuickKeysOn = true;
var displayQuickKeysTimer = 300;

var itemScreen = false;

var rockBulletList = [];
var wallTrapList = [];

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

var levelNow = 0;
var roomGrid = [];

var canvas;
var canvasContext;

const XRAY_VISION_ENABLED = true; // can we see player through walls?
const XRAY_VISION_ENABLED_ON_ENEMIES_TOO = true; // enemies as well?
const XRAY_VISION_OPACITY = 0.1;

//game states
var liveGame = false;
var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = false;

var feedbacktoPlayerLine1 = "You have arrived at Castle Rocky."
var feedbacktoPlayerLine2 = "Clear the castle to claim reward."


