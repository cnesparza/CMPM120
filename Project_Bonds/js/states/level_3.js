// Level 2 state

var Level_3 = function ( game ) {};
Level_3.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
        this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.prevTrust = trustLVL;
		this.ropeBroken = ropeBroken;
	},

	create: function()
	{
        console.log( 'Level_3: lvl == ' + this.lvl );

        // Set up collision events
		game.physics.p2.setImpactEvents(true);

        // load background
    	setBg( game, this.trustLVL );

        // load sign to show where to go
        var sign = game.add.image( game.world.width - 50, 144, 'sign' );
        sign.anchor.setTo( 0.5, 1 );
        
		// set up level
		map = game.add.tilemap( 'level_3' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );

        // Resetting bounds to the world after resize
        game.physics.p2.setBoundsToWorld( true, false, false, false, true );

		// Setting up world properties
        game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set up collision groups for colored platforms
		var worldCollisionGroup = game.physics.p2.createCollisionGroup();
		var jarCollisionGroup = game.physics.p2.createCollisionGroup();
		var p1CollisionGroup = game.physics.p2.createCollisionGroup();
		var p2CollisionGroup = game.physics.p2.createCollisionGroup();

		// Set collision group for each tile from tilemap
		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// spawn collectible
		var jar = game.add.sprite( 75, 160, 'jar' );
		game.physics.p2.enable( [ jar ], false );
		jar.body.static = true;
		jar.body.setCollisionGroup( jarCollisionGroup );
		jar.body.collides( [ p1CollisionGroup, p2CollisionGroup ], collectJar, this );
        
		// Set players new positions
		player1 = new Player1( game, 50, game.world.height - 105, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );
	    player1.body.setCollisionGroup( p1CollisionGroup );

	    // Set up player 1 to only collide with blue platforms and world
		player1.body.collides( [ worldCollisionGroup, jarCollisionGroup, p2CollisionGroup ] );

	    player2 = new Player2( game, 100, game.world.height - 105, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );
	    player2.body.setCollisionGroup( p2CollisionGroup );

		// Set up player 2 to only collide with red platforms and world
		player2.body.collides( [ worldCollisionGroup, jarCollisionGroup, p1CollisionGroup ] );

        // Connect the players together
        createRope( game, player1, player2 );
        this.ropeBroken = false;

        // invisible barrier offscreen just for polish
        var barrier = game.add.sprite( game.world.width + 50, 138, 'barrier' );
        barrier.scale.setTo( 20, 1 );
        barrier.alpha = 0;
        game.physics.p2.enable( barrier );
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
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
        }

        // Check if players are progressing to next screen
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
            game.state.start( 'Level_4', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }
	}

}