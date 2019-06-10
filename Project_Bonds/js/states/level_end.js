// Level_end state

var Level_End = function ( game ) {};
Level_End.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.ropeBroken = ropeBroken;
		this.ending = "";
		this.restart = false;
	},

	create: function()
	{
		// load background
    	setBg( game, this.trustLVL );
		
    	// Set up fly boi! and alternate ending messages
	    var flyTextBox;
    	if( this.trustLVL == 5 )
    	{
    		flyTextBox = game.add.image( 70, 200, 'endGood' );
    		flyTextBox.anchor.setTo( 0, 1 );
		    flyTextBox.scale.setTo( 0.5 );
		    this.ending = "good";
    	}
    	else
    	{
    		flyTextBox = game.add.image( 70, 200, 'endBad' );
    		flyTextBox.anchor.setTo( 0, 1 );
		    flyTextBox.scale.setTo( 0.5 );
		    this.ending = "bad";
    	}


    	var fly = new Fly( game, 60, 200, 'fly', 'fly1' );
	    game.add.existing( fly );

		// set up level
		map = game.add.tilemap( 'level_end' );
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
		createPlat( game, 577, 379, 'redmd', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 672, 297, 'redmd', rplatCollisionGroup, p2CollisionGroup );
		createPlat( game, 1177, 216, 'redxlrg', rplatCollisionGroup, p2CollisionGroup );

		// Create last blue platforms
		createPlat( game, 577, 560, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 672, 630, 'blumd', bplatCollisionGroup, p1CollisionGroup );
		createPlat( game, 1177, game.world.height - 32, 'bluxlrg', bplatCollisionGroup, p1CollisionGroup );

		// Set players new positions
		player1 = new Player1( game, 50, game.world.centerY - 20, 'player', 'blue 1', 
			plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player1 );
		player1.body.setCollisionGroup( p1CollisionGroup );
		player1.body.collides( [ worldCollisionGroup, bplatCollisionGroup, p2CollisionGroup ] );

		player2 = new Player2( game, 100, game.world.centerY - 20, 'buddy', 'red 1',
			plyrSpeed, plyrJump, 0.5, this.ropeBroken );
		game.add.existing( player2 );
		player2.body.setCollisionGroup( p2CollisionGroup );
		player2.body.collides( [ worldCollisionGroup, rplatCollisionGroup, p1CollisionGroup ] );

		// Re-create string between players for the last time
		this.createRope( game, player1, player2 );
		this.ropeBroken = false;		
	},

	update: function()
	{	
		// Update string sprite
		if( this.ropeBroken != true )
		{
			this.drawRope( player1, player2 );
		}

		// Check for ending
		if( player1.body.x > game.world.centerX && player2.body.x > game.world.centerX )
		{

			if( this.ending == "bad" )
			{
				this.breakString( game, player1, player2, this.ropeBroken );
				this.ropeBroken = true;
			}
		}

		// Transition to final screen and main menu
        if( ( player1.body.x > game.world.width + 20 ) && ( player2.body.x > game.world.width + 20 ) )
        {
			var finalPlaque = game.add.image( game.world.centerX, game.world.centerY, 'final' );
			finalPlaque.anchor.set( 0.5 );
			finalPlaque.scale.set( 0.5 );
			this.restart = true;
        }

        if( game.input.keyboard.justPressed( Phaser.Keyboard.SPACEBAR ) && this.restart == true )
		{
			game.state.start( 'Menu', true, false );
		}

	},

	createRope: function( game, p1, p2 )
	{
    	// Add bitmap data to draw the rope
	    this.ropeBitmapData = game.add.bitmapData( this.game.world.width, this.game.world.height );

    	this.ropeBitmapData.ctx.beginPath();
	    this.ropeBitmapData.ctx.lineWidth = "2";
    	this.ropeBitmapData.ctx.strokeStyle = "#e6ac00";
	    this.ropeBitmapData.ctx.stroke();

	    // Create a new sprite using the bitmap data
	    this.line = game.add.sprite( 0, 0, this.ropeBitmapData );

	    // Create a spring between the player and block to act as the ropoe
	    this.rope = game.physics.p2.createSpring( p1, p2, 50, 5, 1 );

	    // Draw a line from the players
	    this.line = new Phaser.Line( p1.x, p1.y + 14, p2.x, p2.y + 9 );

	},// End of "createRope"

	drawRope: function( player1, player2 ) 
	{
	    // Change the bitmap data to reflect the new rope position
	    this.ropeBitmapData.clear();
	    this.ropeBitmapData.ctx.beginPath();
	    this.ropeBitmapData.ctx.beginPath();
	    this.ropeBitmapData.ctx.moveTo( player1.x, player1.y + 14 );
	    this.ropeBitmapData.ctx.lineTo( player2.x, player2.y + 9 );
	    this.ropeBitmapData.ctx.lineWidth = 2;
	    this.ropeBitmapData.ctx.stroke();
	    this.ropeBitmapData.ctx.closePath();
	    this.ropeBitmapData.render();

	},// End of "drawRope"

    breakString: 	function( game, pl1, pl2, ropeBroken )
	{
	    // Clear spring from players
	    game.physics.p2.removeSpring( rope );

	    // Destroy players and create death sprites
	    ropeBroken = true;
	    this.ropeBitmapData.clear();
	     
	}// End of "breakString"
}