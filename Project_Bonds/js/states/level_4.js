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


		// Create blue platforms
		createPlat( game, 300, 282, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 803, 618, 'blulrg', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 1022, 552, 'blusm', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 793, 329, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 925, 218, 'blusm', bplatCollisionGroup, p1CollisionGroup );

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

		// random debug thing
		this.createRope( player1, player2 );
		this.ropeBroken = false;
	},

	update: function()
	{
		// Update string sprite
		if( this.ropeBroken != true )
		{
			this.drawRope();
		}

		// Check if players have broken string or have fallen
		if( this.ropeBroken != true && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			breakString( game, this.ropeBitmapData, player1, player2 );
			this.ropeBroken = true;
			game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
        	this.ropeBitmapData.clear();
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }

	},

	// Code found for creating rope sprite: 
    //https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
    createRope: function( p1, p2 )
    {
        // Add bitmap data to draw the rope
        this.ropeBitmapData = game.add.bitmapData( this.game.world.width, this.game.world.height );

        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.lineWidth = "1.5";
        this.ropeBitmapData.ctx.strokeStyle = "#ffff";
        this.ropeBitmapData.ctx.stroke();

        // Create a new sprite using the bitmap data
        this.line = game.add.sprite( 0, 0, this.ropeBitmapData );

        // Create a spring between the player and block to act as the ropoe
        this.rope = this.game.physics.p2.createSpring( p1, p2, 50, 25, 5 );

        // Draw a line from the players
        this.line = new Phaser.Line( p1.x, p1.y, p2.x, p2.y );
    },

    // Code found for drawing rope sprite: 
    //https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
    drawRope: function() 
    {
        // Change the bitmap data to reflect the new rope position
        this.ropeBitmapData.clear();
        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.moveTo( player1.x, player1.y );
        this.ropeBitmapData.ctx.lineTo( player2.x, player2.y );
        this.ropeBitmapData.ctx.lineWidth = 1.5;
        this.ropeBitmapData.ctx.stroke();
        this.ropeBitmapData.ctx.closePath();
        this.ropeBitmapData.render();
    }

}