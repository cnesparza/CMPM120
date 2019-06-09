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

function Player2( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
{
	// call to Phaser.Sprite
	// new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, x, y, key, frame );

	// add player properties
	this.anchor.set( 0.5 );
	this.plyrSpeed = plyrSpeed;
	this.plyrJump = plyrJump;
	this.scale.x = scale;
	this.scale.y = scale;
	this.yAxis = p2.vec2.fromValues( 0, 1 );
	this.jumpTimer = 0;
    this.dead = false;

	// enable physics
	game.physics.p2.enable( this );
	this.body.fixedRotation = true;
    // this.body.collideWorldBounds = false;

	// Add animations for player depending on which one they are
	this.animations.add( 'left', [ 'red 9', 'red 10', 'red 11', 'red 12', 'red 13', 'red 14', 'red 15', 'red 16' ], 20, true );
    this.animations.add( 'right', [ 'red 1', 'red 2', 'red 3', 'red 4', 'red 5', 'red 6', 'red 7', 'red 8' ], 20, true );

	// Add sounds for jump
    this.jump = game.add.audio( 'jump' );
    this.jump.allowMultiple = true;

    // Create keyboard functionality
    cursors = game.input.keyboard.createCursorKeys();
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player2.prototype = Object.create( Phaser.Sprite.prototype );
Player2.prototype.constructor = Player2;

// override Phaser.Sprite update
Player2.prototype.update = function()
{
	if( game.input.keyboard.isDown( Phaser.Keyboard.A ) )
    {
        this.body.moveLeft( this.plyrSpeed );
		this.animations.play( 'left' );

    }
    else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) )
    {
        this.body.moveRight( this.plyrSpeed );
		this.animations.play( 'right' );
    }
    else
    {
        this.animations.stop();
        this.body.velocity.x = 0;
    }

    // Allow the player to jump if they are touching the ground
    if( (game.input.keyboard.isDown( Phaser.Keyboard.W ) && game.time.now > this.jumpTimer && checkIfCanJump( this, this.yAxis ) ) )
    {
        this.jump.play( '', 0, 0.05, false );
        this.body.moveUp( this.plyrJump );
        this.jumpTimer = game.time.now + 750;
    }
}


// Code for checkIfCanJump function found:
// https://phaser.io/examples/v2/p2-physics/platformer-material
function checkIfCanJump ( player, yAxis )
{
    var result = false;

    for( var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++ )
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
            
        if( c.bodyA === player.body.data || c.bodyB === player.body.data )
        {
            var d = p2.vec2.dot( c.normalA, yAxis );

            if( c.bodyA === player.body.data )
            {
                d *= -1;
            }

            if( d > 0.5 )
            {
                result = true;
            }
        }   
    }

    return result;

}