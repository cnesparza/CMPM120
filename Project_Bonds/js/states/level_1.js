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

        // set up collision groups for detection
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var platformCollisionGroup = game.physics.p2.createCollisionGroup();

        // set up level
        map = game.add.tilemap( 'level' );
        map.addTilesetImage( 'tilesheet_test', 'tilesheet' );

        //map.setCollisionBetween( 1, 12 );
        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );
        layer = map.createLayer( 'Tile Layer 1' );
        //layer.resizeWorld();

        // Setting up world properties
        game.physics.p2.gravity.y = 5000;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness( 1e5 );

        player1 = new Player( game, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, 1, ropeBroken );
        game.add.existing( player1 );
	}

}