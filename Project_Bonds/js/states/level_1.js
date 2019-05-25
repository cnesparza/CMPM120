// Level 1 state

var Level_1 = function( game ) {};
Level_1.prototype =
{
	init: function()
	{
		this.trustLVL = 0;
	},

	create: function()
	{
	// start physics engine for game
    game.physics.startSystem( Phaser.Physics.P2JS );

    // Set up collision groups.
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var levelCollisionGroup = game.physics.p2.createCollisionGroup();

    // load images for controls
    game.add.image( game.world.centerX, game.world.height - 300, 'p1_controls' );
    game.add.text( game.world.centerX - 25, game.world.height - 250, 'player 1 controls', { fontSize: '16px', fill: '#FFF' } );
    game.add.image( game.world.centerX, 50, 'p2_controls' );
    game.add.text( game.world.centerX - 25, 110, 'player 2 controls', { fontSize: '16px', fill: '#FFF' } );


    // set up level
    map = game.add.tilemap( 'level_1' );
    map.addTilesetImage( 'plattspritesheet', 'tilesheet' );
    map.setCollisionByExclusion( [ ] );
    layer = map.createLayer( 'Tile Layer 1' );
    game.physics.p2.convertTilemap( map, layer );
    layer.resizeWorld();
    // .setCollisionGroup( levelCollisionGroup );
    // layer = map.createLayer( 'Tile Layer 1' );

    // Setting up world properties
    game.physics.p2.gravity.y = 5000;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness( 1e5 );

    // Create player 1 function Player1( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player1 = new Player1( game, 80, game.world.height - 100, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player1 );
    // player1.body.setCollisionGroup( playerCollisionGroup );

    // Create player 2 function Player2( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player2 = new Player2( game, game.world.width - 100, 275, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player2 );
    // player2.body.setCollisionGroup( playerCollisionGroup );

    // Set up collision between layer and players
    game.physics.p2.setBoundsToWorld( false, false, true, true, false );

    // set players together
    //this.createRope( player1, player2 );

	},

    update: function()
    {
		if( player2.body.x < 0 && player1.body.x > game.width )
		{
			game.state.start( 'Level_2', true, false, this.trustLVL, ropeBroken )
		}    	
    }

}