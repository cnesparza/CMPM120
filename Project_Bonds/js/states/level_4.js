// Level 4 state

var Level_4 = function ( game ) {};
Level_4.prototype = 
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
    	var sign = game.add.image( game.world.width - 50, 144, 'sign' );
    	sign.anchor.setTo( 0.5, 1 );
		
		// set up level
		map = game.add.tilemap( 'level_4' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

		map.setCollisionByExclusion( [] );
		game.physics.p2.convertTilemap( map, layer );

		// Resetting bounds to the world after resize
		game.physics.p2.setBoundsToWorld( false, false, false, false, true );

		// Setting up world physics
		game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set up collision groups for colored platforms
		var worldCollisionGroup = game.physics.p2.createCollisionGroup();
		var jarCollisionGroup = game.physics.p2.createCollisionGroup();
		var rplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var bplatCollisionGroup = game.physics.p2.createCollisionGroup();
		var p1CollisionGroup = game.physics.p2.createCollisionGroup();
		var p2CollisionGroup = game.physics.p2.createCollisionGroup();

		// Set collision group for each tile from tilemap
		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// Create red platforms
		createPlat( game, 300, 380, 'redmd', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 1072, 380, 'redlrg', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 545, 550, 'redsm', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 1090, 265, 'redsm', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 160, 624, 'redsm', rplatCollisionGroup, p2CollisionGroup );


		// Create blue platforms
		createPlat( game, 300, 282, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 803, 618, 'blulrg', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 1022, 552, 'blusm', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 48, 560, 'blusm', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 793, 329, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 925, 218, 'blusm', bplatCollisionGroup, p1CollisionGroup );

		// create jar to be collected
		var jar = game.add.sprite( 48, 520, 'jar' );
		game.physics.p2.enable( [ jar ], false );
		jar.body.static = true;
		jar.body.setCollisionGroup( jarCollisionGroup );
		jar.body.collides( [ p1CollisionGroup, p2CollisionGroup ], collectJar, this );

		// Set players new positions
		player1 = new Player1( game, 50, 97, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );

		// Set up player 1 to only collide with blue platforms and world
		player1.body.collides( [ worldCollisionGroup, jarCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 90, 97, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );

		// Set up player 2 to only collide with red platforms and world
		player2.body.collides( [ worldCollisionGroup, jarCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

		// Re-create string between players
		createRope( game, player1, player2 );
		this.ropeBroken = false;

		// invisible barrier offscreen just for polish
        var barrier = game.add.sprite( game.world.width + 50, 138, 'barrier' );
        barrier.scale.setTo( 20, 1 );
        barrier.alpha = 0;
        game.physics.p2.enable( barrier );
        barrier.body.setCollisionGroup( worldCollisionGroup );
        barrier.body.collides( [p1CollisionGroup, p2CollisionGroup ] );
        barrier.body.static = true;

        barrier = game.add.sprite( -8, -5, 'barrier' );
        barrier.scale.setTo( 1, 25 );
        barrier.alpha = 0;        
        game.physics.p2.enable( barrier );
        barrier.body.setCollisionGroup( worldCollisionGroup );
        barrier.body.collides( [p1CollisionGroup, p2CollisionGroup ] );
        barrier.body.static = true;
	},

	update: function()
	{
		// Update string sprite
		if( this.ropeBroken != true )
		{
			drawRope( player1, player2 );
		}

		// Check if players have broken string or have fallen
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
            game.state.start( 'Level_5', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }

	}

}