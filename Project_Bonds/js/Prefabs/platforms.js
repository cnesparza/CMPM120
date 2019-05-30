// ====================================================================
// file: platforms.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// File Description: Platforms prefab
// ====================================================================

function Platforms( game, x, y, key, frame, platCollisionGroup, playerCollisionGroup )
{
	// call to Phaser.Sprite
	// new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, x, y, key, frame );

	// platform properties
	this.anchor.set( 0.5 );
	// this.platCollisionGroup = platCollisionGroup;
	// this.playerCollisionGroup = playerCollisionGroup;

	// enable physics
	game.physics.p2.enable( this );
	this.body.immovable = true;
	this.body.static = true;
	this.body.setCollisionGroup( platCollisionGroup );
	this.body.collides( [ playerCollisionGroup ] );
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Platforms)
Platforms.prototype = Object.create( Phaser.Sprite.prototype );
Platforms.prototype.constructor = Platforms;
