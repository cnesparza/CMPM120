// ====================================================================
// file: fire.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// File Description: Fire Prefab
// ====================================================================

function Fire( game, x, y, key, frame, hazCollisionGroup, p1CollisionGroup, p2CollisionGroup )
{
	// call to Phaser.Sprite
	// new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, x, y, key, frame );

	// add fire properties
	this.anchor.set( 0.5 );
	this.scale.x = 1.5;
	this.scale.y = 1.5;
	game.physics.p2.enable( this );
	this.body.static = true;
	this.body.setCollisionGroup( hazCollisionGroup );
	this.body.collides( [ p1CollisionGroup, p2CollisionGroup ] );


	// Add and play animations
    this.animations.add( 'flicker', [ 'fire1', 'fire2', 'fire3' ], 20, true );
    this.animations.play( 'flicker', null, true, false );
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Fire)
Fire.prototype = Object.create( Phaser.Sprite.prototype );
Fire.prototype.constructor = Fire;