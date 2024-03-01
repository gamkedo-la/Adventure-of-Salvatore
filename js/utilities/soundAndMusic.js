//sounds
var crashIntoConeSound = new SoundOverlapsClass("crashCone");
var swordSwingSound = new SoundOverlapsClass("sword_3");
var swordSwing2Sound = new SoundOverlapsClass("sword_swing_genAI");
var doorOpenSound = new SoundOverlapsClass("door-opening-AoS-genAI")
var swordMissSound = new SoundOverlapsClass("sword_miss_genAI");
var pitTrapSound = new SoundOverlapsClass("pit_trap_unarmed");
var spikeTrapSound = new SoundOverlapsClass("spike_trap_unarmed");

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) { 
        // fully supported by all browsers and platforms
        // see https://caniuse.com/?search=mp3
        audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg"; // never used
    }
}

var mainBackgroundMusic = new BackgroundMusicClass();

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("sound muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass() {
    var musicSound = null;
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
