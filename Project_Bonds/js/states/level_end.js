// Level_end state

var Level_End = function ( game ) {};
Level_End.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.ropeBroken = ropeBroken;
	},

	create: function()
	{
		// load background
    	var background = game.add.sprite( 0, 0, 'treebg' );
    	background.alpha = 0.4;
		
		// Demo level text
		var endText = game.add.text( game.world.centerX, 100, 'Congrats, you did nothing...', { fontSize: '32px', fill: '#FFF' } );
        endText.anchor.set( 0.5 );

		// set up level
		map = game.add.tilemap( 'level_end' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

		map.setCollisionByExclusion( [] );
		game.physics.p2.convertTilemap( map, layer );

		// Resetting bounds to the world after resize
		game.physics.p2.setBoundsToWorld( true, true, false, false, true );

		// Setting up world physics
		game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set up collision groups for colored platforms
		var worldCollisionGroup = game.physics.p2.createCollisionGroup();
		var bplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var rplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var p1CollisionGroup = game.physics.p2.createCollisionGroup();
		var p2CollisionGroup = game.physics.p2.createCollisionGroup();

		// Set collision group for each tile from tilemap
		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// Create last red platforms
		createPlat( game, 577, 379, 'redsm', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 672, 297, 'redsm', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 1177, 216, 'redxlrg', rplatCollisionGroup, p2CollisionGroup );

		// Create last blue platforms
		createPlat( game, 577, 567, 'blusm', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 672, 633, 'blusm', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 1177, game.world.height - 32, 'bluxlrg', bplatCollisionGroup, p1CollisionGroup );

		// Set players new positions
		player1 = new Player1( game, 50, game.world.centerY + 100, 'player', 'blue 1', 
			plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );
		player1.body.collides( [ worldCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 100, game.world.centerY + 100, 'buddy', 'red 1',
			plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );
		player2.body.collides( [ worldCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

		// Re-create string between players for the last time
		createRope( game, player1, player2 );
		this.ropeBroken = false;
	},

	update: function()
	{		
		drawRope( player1, player2 );
	}
}