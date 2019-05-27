// Level 2 state

var Level_2 = function ( game ) {};
Level_2.prototype =
{
	init: function ( trustLVL, ropeBroken )
	{
		this.trustLVL = 0;
		this.ropeBroken = ropeBroken
		this.connected = false;
	},

	create: function()
	{
		// set up level
		map = game.add.tilemap( 'level_2' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet2' );
		map.setCollisionByExclusion( [] );
		layer = map.createLayer( 'Tile Layer 1' );
		game.physics.p2.convertTilemap( map, layer );
		layer.resizeWorld();

		// Setting up world properties
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set players new positions
		player1 = new Player1( game, game.world.width - 100, 0, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );
	    player2 = new Player2( game, 80, 0, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );

		// Resetting bounds to the world after resize
		game.physics.p2.setBoundsToWorld( true, false, false, false, false );
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
		}

		// Update string sprite
		if( this.ropeBroken != true && this.connected == true )
		{
			this.drawRope();
		}

		// Check if players have broken string or have fallen
		if( this.ropeBroken != true && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			this.breakString( player1, player2 );
			game.state.start( 'Game_Over', false, false, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height || player2.body.y > game.world.height )
        {
            game.state.start( 'Game_Over', false, false, this.trustLVL, this.ropeBroken );
        }
	},

	// Code found for creating rope sprite: 
    //https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
    createRope: function( p1, p2 )
    {
        // Add bitmap data to draw the rope
        this.ropeBitmapData = game.add.bitmapData( this.game.world.width, this.game.world.height );

        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.lineWidth = "2";
        this.ropeBitmapData.ctx.strokeStyle = "#ffffff";
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
        this.ropeBitmapData.ctx.lineWidth = 2;
        this.ropeBitmapData.ctx.stroke();
        this.ropeBitmapData.ctx.closePath();
        this.ropeBitmapData.render();
    },

    // Break String method
    breakString: function ( pl1, pl2 )
    {
        // Clear spring from players
        game.physics.p2.removeSpring( rope );
        this.ropeBroken = true;

        // Store coordinates for players
        var p1x = pl1.body.x;
        var p1y = pl1.body.y;
        var p2x = pl2.body.x;
        var p2y = pl2.body.y;

        // Destroy players and create death sprites
        pl1.destroy();
        pl2.destroy();
        this.ropeBitmapData.clear();
        pl1 = game.add.sprite( p1x, p1y, 'dead_player', 'bluedied 1' );
        pl1.scale.setTo( 0.5, 0.5 );
        pl1.animations.add( 'death', [ 'bluedied 1', 'bluedied 2', 'bluedied 3', 'bluedied 4', 'bluedied 5', 'bluedied 6', 'bluedied 7', 'bluedied 8', 'bluedied 9', 'bluedied 10', 'bluedied 11', 'bluedied 12' ], 20, true );
        pl2 = game.add.sprite( p2x, p2y, 'dead_buddy', 'reddied 1' );
        pl2.scale.setTo( 0.5, 0.5 );
        pl2.animations.add( 'death', [ 'reddied 1', 'reddied 2', 'reddied 3', 'reddied 4', 'reddied 5', 'reddied 6', 'reddied 7', 'reddied 8', 'reddied 9', 'reddied 10', 'reddied 11', 'reddied 12' ], 20, true );

        // batch enable physics
        game.physics.p2.enable( [ pl1, pl2 ], false );

        // Play death animation
        pl1.animations.play( 'death', null, false, false );
        pl2.animations.play( 'death', null, false, false ); 
        
    }

}