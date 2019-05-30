// Level 4 state

var Level_4 = function ( game ) {};
Level_4.prototype = 
{
	init: function( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = 0;
		this.ropeBroken = ropeBroken;
	},

	create: function()
	{
		// set up level
		map = game.add.tilemap( 'level_4' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

		map.setCollisionByExclusion( [] );
		game.physics.p2.convertTilemap( map, layer );

		// Resetting bounds to the world after resize
		game.physics.p2.setBoundsToWorld( true, false, false, false, true );

		// Setting up world physics
		game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set up collision groups for colored platforms
		var worldCollisionGroup = game.physics.p2.createCollisionGroup();
		var rplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var p1CollisionGroup = game.physics.p2.createCollisionGroup();
		var p2CollisionGroup = game.physics.p2.createCollisionGroup();

		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// Grab red platform from object layer
		var redPlats = game.add.physicsGroup( Phaser.Physics.P2JS );
		map.createFromObjects( 'red_plat', 649, 'redlrg', 0, true, true, redPlats );
		// Have all platforms be static
		redPlats.setAll( 'body.static', true );
		redPlats.setAll( 'body.setCollisionGroup', rplatCollisionGroup );
		redPlats.setAll( 'body.collides', [ p2CollisionGroup ] );

		// Set players new positions
		player1 = new Player1( game, 0, 0, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );

		// Set up player 1 to only collide with blue platforms and world
		player1.body.collides( [ worldCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 75, 0, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );

		// Set up player 2 to only collide with red platforms and world
		player2.body.collides( [ worldCollisionGroup, p1CollisionGroup ] );

		// random debug thing
		this.ropeBroken = false;
	},

	update: function()
	{
		if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }
	}
}