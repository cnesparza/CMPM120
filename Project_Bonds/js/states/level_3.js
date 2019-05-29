// Level 2 state

var Level_3 = function ( game ) {};
Level_3.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
        this.lvl = lvl;
		this.trustLVL = 0;
		this.ropeBroken = ropeBroken
	},

	create: function()
	{
		// set up level
		map = game.add.tilemap( 'level_3' );
		map.addTilesetImage( 'Platspritesheet', 'tilesheet2' );
		layer = map.createLayer( 'PurplePlats' );
		layer.resizeWorld();

        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );

        // Resetting bounds to the world after resize
        game.physics.p2.setBoundsToWorld( true, false, false, false, true );

		// Setting up world properties
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

        // Set up collision groups for colored platforms
        var worldCollisionGroup = game.physics.p2.createCollisionGroup();
        var bplatCollisionGroup = game.physics.p2.createCollisionGroup();
        var rplatCollisionGroup = game.physics.p2.createCollisionGroup();
        var p1CollisionGroup = game.physics.p2.createCollisionGroup();
        var p2CollisionGroup = game.physics.p2.createCollisionGroup();

        for( var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++ )
        {
            var tileBody = map.layer.bodies[bodyIndex];
            tileBody.setCollisionGroup( worldCollisionGroup );
            tileBody.collides( [ p1CollisionGroup, p2CollisionGroup ] );
        }

		// Set players new positions
		player1 = new Player1( game, 50, game.world.height - 65, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );
        player1.body.setCollisionGroup( p1CollisionGroup );

        // Set up player 1 to only collide with blue platforms
        player1.body.collides( [ worldCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

	    player2 = new Player2( game, 100, game.world.height - 65, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );
        player2.body.setCollisionGroup( p2CollisionGroup );

        // Set up player 2 to only collide with red platforms
        player2.body.collides( [ worldCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

        // Connect the players together
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
			this.breakString( player1, player2 );
			game.state.start( 'Game_Over', false, false, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, game.state.getCurrentState(), this.trustLVL, this.ropeBroken );
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
        this.ropeBitmapData.ctx.strokeStyle = "#FFB200";
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
        pl1.scale.setTo( 0.25, 0.25 );
        pl1.animations.add( 'death', [ 'bluedied 1', 'bluedied 2', 'bluedied 3', 'bluedied 4', 'bluedied 5', 'bluedied 6', 'bluedied 7', 'bluedied 8', 'bluedied 9', 'bluedied 10', 'bluedied 11', 'bluedied 12' ], 20, true );
        pl2 = game.add.sprite( p2x, p2y, 'dead_buddy', 'reddied 1' );
        pl2.scale.setTo( 0.25, 0.25 );
        pl2.animations.add( 'death', [ 'reddied 1', 'reddied 2', 'reddied 3', 'reddied 4', 'reddied 5', 'reddied 6', 'reddied 7', 'reddied 8', 'reddied 9', 'reddied 10', 'reddied 11', 'reddied 12' ], 20, true );

        // batch enable physics
        game.physics.p2.enable( [ pl1, pl2 ], false );

        // Play death animation
        pl1.animations.play( 'death', null, false, false );
        pl2.animations.play( 'death', null, false, false ); 
        
    }

}