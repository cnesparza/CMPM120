// ====================================================================
// file: fly.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// File Description: Fly prefab
// ====================================================================

function Fly( game, x, y, key, frame )
{
	// call to Phaser.Sprite
	// new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, x, y, key, frame );

	// add fly properties
	this.anchor.set( 0.5 );

	// Add and play animations
    this.animations.add( 'flying', [ 'fly1', 'fly2', 'fly3' ], 18, true );
    this.animations.play( 'flying', null, true, false );
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Fly)
Fly.prototype = Object.create( Phaser.Sprite.prototype );
Fly.prototype.constructor = Fly;