// Level 2 state

var Level_2 = function ( game ) {};
Level_2.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = 0;
		this.ropeBroken = ropeBroken
		this.connected = false;
	},

	create: function()
	{
        console.log( 'Level_2: lvl == ' + this.lvl );
		// set up level
		map = game.add.tilemap( 'level_2' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );

        // Resetting bounds to the world after resize
        game.physics.p2.setBoundsToWorld( true, true, false, false, true );

		// Setting up world properties
        game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

        // Set up collision groups for colored platforms
        var worldCollisionGroup = game.physics.p2.createCollisionGroup();
        var p1CollisionGroup = game.physics.p2.createCollisionGroup();
        var p2CollisionGroup = game.physics.p2.createCollisionGroup();

        for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
        {
            var tileBody = map.layer.bodies[bodyIndex];
            tileBody.setCollisionGroup( worldCollisionGroup );
            tileBody.collides( [ p1CollisionGroup, p2CollisionGroup ] );
        }


		// Set players new positions
		player1 = new Player1( game, game.world.width - 100, 0, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );
        player1.body.setCollisionGroup( p1CollisionGroup );

        // Set up player 1 to only collide with blue platforms
        player1.body.collides( [ worldCollisionGroup, p2CollisionGroup ] );

	    player2 = new Player2( game, 80, 0, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );
        player2.body.setCollisionGroup( p2CollisionGroup );

        // Set up player 2 to only collide with red platforms
        player2.body.collides( [ worldCollisionGroup, p1CollisionGroup ] );

	},

	update: function()
	{
		// Once players 'meet' connect them together with string
		if( ( this.ropeBroken == true && this.connected == false ) && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) < 100 ) )
		{
			// Connect the players together
			this.createRope( player1, player2 );
			this.ropeBroken = false;
			this.connected = true;
            game.physics.p2.setBoundsToWorld( true, false, false, false, true );
		}

		// Update string sprite
		if( this.ropeBroken != true && this.connected == true )
		{
			this.drawRope( player1, player2 );
		}

		// Check if players have broken string or have fallen
		if( ( this.ropeBroken != true && this.connected == true ) && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			breakString( game, this.ropeBitmapData, player1, player2 );
            this.ropeBroken = true;
			var state = game.state.getCurrentState();
			game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 75 || player2.body.y > game.world.height + 75 )
        {
        	this.ropeBroken = true;
        	var state = game.state.getCurrentState();
            game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }

        // Check if players are progressing to next screen
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
        	game.state.start( 'Level_3', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
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