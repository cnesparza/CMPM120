// Nathan Altice
// Paddle Parkour Redux
// An endless dodging game
// Updated 4/22/19

"use strict";

// define globals
var game;
var paddle = null;
var paddleVelocity = 150;
var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14]; // colors array (rainbows!)
var colorIndex = 0;
var extremeMODE;
var barrierSpeed;
var level;
var highScore;
var newHighScore;

// wait for browser to load before creating Phaser game
window.onload = function() {
	// uncomment the following line if you need to purge local storage data
	// localStorage.clear();
	
	// define game
	game = new Phaser.Game( 1125,600, Phaser.AUTO, 'myGame' );
	
	// define states
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('Boot');
}







