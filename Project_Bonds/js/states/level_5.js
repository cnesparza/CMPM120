// Level 5 state

var Level_5 = function ( game ) {};
Level_5.prototype = 
{
	init: function( lvl, trustLVL, ropeBroken )
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
		
		// set up level
		map = game.add.tilemap( 'level_5' );
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
		var spikeCollisionGroup = game.physics.p2.createCollisionGroup();

		// Set collision group for each tile from tilemap
		for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
		{
			var tileBody = map.layer.bodies[bodyIndex];
			tileBody.setCollisionGroup( worldCollisionGroup );
			tileBody.collides( [p1CollisionGroup, p2CollisionGroup ] );
		}

		// Create spikes on platforms
		createSpike( game, 240, 512, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		createSpike( game, 208, 512, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		createSpike( game, 64, 512, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		createSpike( game, 32, 512, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		createSpike( game, 976, 272, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );
		createSpike( game, 1088, 272, 'redSpike', spikeCollisionGroup, p1CollisionGroup, p2CollisionGroup );

		// Create red platforms
		createPlat( game, 1032, 224, 'redmd', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 136, 464, 'redlrg', rplatCollisionGroup, p2CollisionGroup );

		// Create blue platforms
		createPlat( game, 280, 304, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 680, 368, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 688, 592, 'blusm', bplatCollisionGroup, p1CollisionGroup );

		// Set players new positions
		player1 = new Player1( game, 0, 0, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );

		// Set up player 1 to only collide with blue platforms and world
		player1.body.collides( [ worldCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 75, 0, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );

		// Set up player 2 to only collide with red platforms and world
		player2.body.collides( [ worldCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

		// Set up spike collisions with callBack
		player1.body.collides( spikeCollisionGroup, function () { 
			player1.dead = true; }, this );
		player2.body.collides( spikeCollisionGroup, hitSpike, this );

		// Re-create string between players
		createRope( game, player1, player2 );
		this.ropeBroken = false;
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
			game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
        	ropeBitmapData.clear();
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }
        else if( player1.dead == true || player2.dead == true )
        {
        	breakString( game, player1, player2, ropeBroken );
        	this.ropeBroken = true;
        	game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }


        // Check if players move on to next level
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
            game.state.start( 'Level_End', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }

	}

}