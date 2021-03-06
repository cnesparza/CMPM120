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
var bg = [ "#B2A68D", "#C6B58B", "#CEB577", "#E5C472", "#F7D571" ];
var levels = [ "Menu", "Tutorial", "Bonds", "Level_1", "Level_2", "Level_3", "Level_4", "Level_5", "Level_End" ];
var lvl;
var map;
var layer;
var trustLVL;
var prevTrust;
var ropeBitmapData;
var rope;
var line;
var ropeBroken = true;
var plyrSpeed = 300;
var plyrJump = 1500;
var bgm;


// wait for browser to load before creating Phaser game
window.onload = function() {
	
	// define game
	game = new Phaser.Game( 1280,720, Phaser.AUTO, 'phaser' );
	
	// define states
	game.state.add( 'Boot', Boot );
	game.state.add( 'Load', Load );
	game.state.add( 'Menu', Menu );
	game.state.add( 'Credits', Credits );
	game.state.add( 'Level_1', Level_1 );
	game.state.add( 'Level_2', Level_2 );
	game.state.add( 'Level_3', Level_3 );
	game.state.add( 'Level_4', Level_4 );
	game.state.add( 'Level_5', Level_5 );
	game.state.add( 'Level_6', Level_6 );
	game.state.add( 'Level_7', Level_7 );
	game.state.add( 'Level_End', Level_End );
	game.state.add( 'Game_Over', Game_Over );
	game.state.start( 'Boot' );
}
