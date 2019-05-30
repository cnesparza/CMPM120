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
	spike.body.setCollisionGroup( spikeCollisionGroup );
	spike.body.collides( [ p1CollisionGroup, p2CollisionGroup ] );
}// End of "createSpike"



// === breakString ====================================================
// ====================================================================
function    breakString( game, ropeBitmapData, pl1, pl2 )
{
    // Clear spring from players
    game.physics.p2.removeSpring( rope );

    // Store coordinates for players
    var p1x = pl1.body.x;
    var p1y = pl1.body.y;
    var p2x = pl2.body.x;
    var p2y = pl2.body.y;

    // Destroy players and create death sprites
    pl1.destroy();
    pl2.destroy();
    ropeBitmapData.clear();
    pl1 = game.add.sprite( p1x, p1y, 'dead_player', 'bluedied 1' );
    pl1.scale.setTo( 0.25, 0.25 );
    pl1.animations.add( 'death', [ 'bluedied 1', 'bluedied 2', 'bluedied 3', 'bluedied 4', 'bluedied 5', 'bluedied 6', 'bluedied 7', 'bluedied 8', 'bluedied 9', 'bluedied 10', 'bluedied 11', 'bluedied 12' ], 20, true );
    pl2 = game.add.sprite( p2x, p2y, 'dead_buddy', 'reddied 1' );
    pl2.scale.setTo( 0.25, 0.25 );
    pl2.animations.add( 'death', [ 'reddied 1', 'reddied 2', 'reddied 3', 'reddied 4', 'reddied 5', 'reddied 6', 'reddied 7', 'reddied 8', 'reddied 9', 'reddied 10', 'reddied 11', 'reddied 12' ], 20, true );

    // batch enable physics
    game.physics.p2.enable( [ pl1, pl2 ], false );
    pl1.body.dynamic = true;
    pl2.body.dynamic = true;

    // Play death animation
    pl1.animations.play( 'death', null, false, false );
    pl2.animations.play( 'death', null, false, false ); 
     
}// End of "breakString"