// ====================================================================
// file: main.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// ====================================================================

"use strict";

// define globals
var game;
var paddle = null;
var paddleVelocity = 150;
var extremeMODE;
var emoteSpeed;
var level;
var highScore;
var newHighScore;

// wait for browser to load before creating Phaser game
window.onload = function() {
	// uncomment the following line if you need to purge local storage data
	// localStorage.clear();
	
	// define game
	game = new Phaser.Game( 1080,720, Phaser.AUTO, 'myGame' );
	
	// define states
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Menu', Menu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('Boot');
}






