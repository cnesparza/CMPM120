// Level 7 state

var Level_7 = function ( game ) {};
Level_7.prototype = 
{
	init: function( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.prevTrust = trustLVL;
		this.ropeBroken = ropeBroken;
	},

	create: function()
	{

		// Set up collision events
		game.physics.p2.setImpactEvents(true);

		// load background
    	setBg( game, this.trustLVL );
		
		// load sign to show where to go
    	var sign = game.add.image( game.world.width - 50, game.world.centerY + 115, 'sign' );
    	sign.anchor.setTo( 0.5, 1 );
    	sign.scale.setTo( 0.75, 0.75 );

		// set up level
		map = game.add.tilemap( 'level_7' );
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
		var bplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var p1CollisionGroup = game.physics.p2.createCollisionGroup();
		var p2CollisionGroup = game.physics.p2.createCollisionGroup();
		var jarCollisionGroup = game.physics.p2.createCollisionGroup();
		var hazCollisionGroup = game.physics.p2.createCollisionGroup();

		// Set collision group for each tile from tilemap
		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// Create red platforms
		xCords = [ 160, 96, 144, 608, 894 ];
		var yCords = [ 224, 352, 480, 208, 400 ];
		for( var i = 0; i < 5; i++ )
		{
			createPlat( game, xCords[i], yCords[i], 'redsm', rplatCollisionGroup, p2CollisionGroup );
		}
		xCords.length = 0;
		yCords.length = 0;

		// Create blue platforms
		xCords = [ 304, 368, 320, 736, 992 ];
		yCords = [ 224, 352, 480, 304, 496 ];
		for( var i = 0; i < 5; i++ )
		{
			createPlat( game, xCords[i], yCords[i], 'blusm', bplatCollisionGroup, p1CollisionGroup );
		}
		xCords.length = 0;
		yCords.length = 0;

		createPlat( game, 1192, 336, 'blumd', bplatCollisionGroup, p1CollisionGroup );

		// Create spikes on platforms
		var xCords = [ 1136, 1168, 1216, 1248 ];
		for( var i = 0; i < 4; i++ )
		{
			createSpike( game, xCords[i], 384, 'bluSpike', hazCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		}
		xCords.length = 0;

		// create jar to be collected
		var jar = game.add.sprite( 1248, 304, 'jar' );
		game.physics.p2.enable( [ jar ], false );
		jar.body.static = true;
		jar.body.setCollisionGroup( jarCollisionGroup );
		jar.body.collides( [ p1CollisionGroup, p2CollisionGroup ], collectJar, this );

		// Set players new positions
		player1 = new Player1( game, 40, game.world.height - 95, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );

		// Set up player 1 to only collide with blue platforms and world
		player1.body.collides( [ worldCollisionGroup, jarCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 90, game.world.height - 95, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );

		// Set up player 2 to only collide with red platforms and world
		player2.body.collides( [ worldCollisionGroup, jarCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

		// Set up spike collisions with callBack
		player1.body.collides( hazCollisionGroup, hitHazard, this );
		player2.body.collides( hazCollisionGroup, hitHazard, this );

		// Re-create string between players
		createRope( game, player1, player2 );
		this.ropeBroken = false;

		// invisible barrier offscreen just for polish

        var barrier = game.add.sprite( game.world.width + 8, 160, 'barrier' );
        barrier.scale.setTo( 1, 20 );
        barrier.alpha = 0;
        game.physics.p2.enable( barrier );
        barrier.body.setCollisionGroup( worldCollisionGroup );
        barrier.body.collides( [ p1CollisionGroup, p2CollisionGroup ] );
        barrier.body.static = true;

	},

	update: function()
	{
		// Update string sprite
		if( this.ropeBroken != true )
		{
			drawRope( player1, player2 );
		}

		if( this.ropeBroken != true && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			breakString( game, player1, player2, ropeBroken );
			this.ropeBroken = true;
			game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
        	ropeBitmapData.clear();
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
        }

        // Check if players move on to next level
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
            game.state.start( 'Level_End', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }

	}

}