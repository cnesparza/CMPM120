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

function Player1( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
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

	// enable physics
	game.physics.p2.enable( this );
	this.body.fixedRotation = true;
    // this.body.damping = 0.5;
    // this.body.collideWorldBounds = false;

	// Add animations for player depending on which one they are
	this.animations.add( 'left', [ 'blue 9', 'blue 10', 'blue 11', 'blue 12', 'blue 13', 'blue 14', 'blue 15', 'blue 16' ], 20, true );
    this.animations.add( 'right', [ 'blue 1', 'blue 2', 'blue 3', 'blue 4', 'blue 5', 'blue 6', 'blue 7', 'blue 8' ], 20, true );

	// Create keyboard functionality
    cursors = game.input.keyboard.createCursorKeys();

}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player1.prototype = Object.create( Phaser.Sprite.prototype );
Player1.prototype.constructor = Player1;

// override Phaser.Sprite update
Player1.prototype.update = function()
{
    // Set up max speed constraint
    // constrainVelocity( this.body, 5000 );

	// Set up player1 movement and animations, if not moving then set velocity to 0
    if( cursors.left.isDown )
    {
        this.body.moveLeft( this.plyrSpeed );
        this.animations.play( 'left' );
    }
    else if( cursors.right.isDown )
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
    if( ( cursors.up.isDown && game.time.now > this.jumpTimer && checkIfCanJump( this, this.yAxis ) ) )
    {
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

// // Code found here: 
// // http://www.html5gamedevs.com/topic/22461-p2-no-collision-at-certain-velocity/
// function    constrainVelocity(body, maxVelocity) 
// {
//     var angle, currVelocitySqr, vx, vy;
//     vx = body.velocity.x;
//     vy = body.velocity.y;
//     currVelocitySqr = vx * vx + vy * vy;
//     if (currVelocitySqr > maxVelocity * maxVelocity) 
//     {
//         angle = Math.atan2(vy, vx);
//         vx = Math.cos(angle) * maxVelocity;
//         vy = Math.sin(angle) * maxVelocity;
//         body.velocity.x = vx;
//         body.velocity.y = vy;
//     }
// }