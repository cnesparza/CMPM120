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
var bg = "#FCD36F";
var map;
var layer;
var trustLVL;
var rope;
var ropeBroken = true;
var plyrSpeed = 300;
var plyrJump = 1500;
// var yAxis = p2.vec2.fromValues( 0, 1 );
// var jumpTimer = 0;

// wait for browser to load before creating Phaser game
window.onload = function() {
	// uncomment the following line if you need to purge local storage data
	// localStorage.clear();
	
	// define game
	game = new Phaser.Game( 1280,720, Phaser.AUTO, 'phaser' );
	
	// define states
	game.state.add( 'Boot', Boot );
	game.state.add( 'Load', Load );
	game.state.add( 'Menu', Menu );
	game.state.add( 'Level_1', Level_1 );
	game.state.add( 'Level_2', Level_2 );
	game.state.start( 'Boot' );
}







