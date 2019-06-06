// ====================================================================
// file: functions.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// ====================================================================

// === createPlat =====================================================
// ====================================================================
function    createPlat( game, x, y, key, platCollisionGroup, playerCollisionGroup )
{

	var platform = game.add.sprite( x, y, key );
	game.physics.p2.enable( [ platform ], false );
	platform.body.static = true;
	platform.body.setCollisionGroup( platCollisionGroup );
	platform.body.collides( [ playerCollisionGroup ] );

}// End of "createPlat"



// === createSpike ====================================================
// ====================================================================
function    createSpike( game, x, y, key, spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup )
{
	var spike = game.add.sprite( x, y, key );
	game.physics.p2.enable( [ spike ], false );
	spike.body.static = true;
	spike.body.setRectangle( 30, 30 );
	spike.body.setCollisionGroup( spikeCollisionGroup );
	spike.body.collides( [ p1CollisionGroup, p2CollisionGroup ] );

}// End of "createSpike"



// === createRope =====================================================
// Code found for creating rope sprite: 
//https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
// ====================================================================
function    createRope( game, p1, p2 )
{
    // Add bitmap data to draw the rope
    ropeBitmapData = game.add.bitmapData( this.game.world.width, this.game.world.height );

    ropeBitmapData.ctx.beginPath();
    ropeBitmapData.ctx.lineWidth = "1.5";
    ropeBitmapData.ctx.strokeStyle = "#e6ac00";
    ropeBitmapData.ctx.stroke();

    // Create a new sprite using the bitmap data
    line = game.add.sprite( 0, 0, this.ropeBitmapData );

    // Create a spring between the player and block to act as the ropoe
    rope = game.physics.p2.createSpring( p1, p2, 50, 20, 3 );

    // Draw a line from the players
    line = new Phaser.Line( p1.x, p1.y + 14, p2.x, p2.y + 9 );

}// End of "createRope"



// === drawRope =======================================================
// Code found for drawing rope sprite: 
//https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
// ====================================================================
function    drawRope( player1, player2 ) 
{
    // Change the bitmap data to reflect the new rope position
    ropeBitmapData.clear();
    ropeBitmapData.ctx.beginPath();
    ropeBitmapData.ctx.beginPath();
    ropeBitmapData.ctx.moveTo( player1.x, player1.y + 14 );
    ropeBitmapData.ctx.lineTo( player2.x, player2.y + 9 );
    ropeBitmapData.ctx.lineWidth = 1.5;
    ropeBitmapData.ctx.stroke();
    ropeBitmapData.ctx.closePath();
    ropeBitmapData.render();

}// End of "drawRope"



// === breakString ====================================================
// ====================================================================
function    breakString( game, pl1, pl2, ropeBroken )
{
    // Clear spring from players
    game.physics.p2.removeSpring( rope );

    // Store coordinates for players
    var p1x = pl1.body.x;
    var p1y = pl1.body.y;
    var p2x = pl2.body.x;
    var p2y = pl2.body.y;

    // Destroy players and create death sprites
    ropeBroken = true;
    pl1.destroy();
    pl2.destroy();
    ropeBitmapData.clear();
    pl1 = game.add.sprite( p1x, p1y, 'dead_player', 'death1' );
    pl1.scale.setTo( 0.28, 0.28 );
    pl1.animations.add( 'death', [ 'death1', 'death2', 'death3', 'death4', 'death5', 'death6', 'death7', 'death8', 'death9', 'death10', 'death11', 'death12', 'death13', 'death14' ], 20, true );
    pl2 = game.add.sprite( p2x, p2y, 'dead_buddy', 'reddied 1' );
    pl2.scale.setTo( 0.28, 0.28 );
    pl2.animations.add( 'death', [ 'reddied 1', 'reddied 2', 'reddied 3', 'reddied 4', 'reddied 5', 'reddied 6', 'reddied 7', 'reddied 8', 'reddied 9', 'reddied 10', 'reddied 11', 'reddied 12' ], 20, true );

    // batch enable physics
    game.physics.p2.enable( [ pl1, pl2 ], false );

    // Play death animation
    pl1.animations.play( 'death', null, false, false );
    pl2.animations.play( 'death', null, false, false ); 
     
}// End of "breakString"



// === hitHazard ======================================================
// ====================================================================
function    hitHazard( body1, body2 )
{
	breakString( game, player1, player2, ropeBroken );
	game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
}// End of "hitSpike"



// === collectJar =====================================================
// ====================================================================
function    collectJar( body1, body2 )
{
	++this.trustLVL;
    console.log( 'trustLVL == ' + this.trustLVL );
	this.jar.destroy();
}// End of "collectJar"


// === setBg ==========================================================
// ====================================================================
function setBg( game )
{
    var background;
    var bgNum = Math.floor( Math.random() * 3 );
    
    if( bgNum == 0 )
    {
        background = game.add.sprite( 0, 0, 'treebg' );
    }
    else if( bgNum == 1 )
    {
    	background = game.add.sprite( 0, 0, 'treebg2' );
    }
	else if( bgNum == 2 )
	{
		background = game.add.sprite( 0, 0, 'treebg3' );
	}            

    background.alpha = 0.4;
}// End of "setBg"