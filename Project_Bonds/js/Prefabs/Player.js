// ====================================================================
// file: Player.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// File Description: Player prefab constructor function
// ====================================================================

function Player( game, key, frame, scale, controls )
{
	// call to Phaser.Sprite
	// new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, 0, game.world.height - 60, key, frame );

	// add player properties
	this.anchor.set( 0.5 );
	this.scale.x = scale;
	this.scale.y = scale;
	this.controls = controls;

	// enable physics
	game.physics.p2.enable( this );
	this.body.fixedRotation = true;
}