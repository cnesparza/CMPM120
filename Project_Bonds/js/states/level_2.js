// Level 2 state

var Level_2 = function ( game ) {};
Level_2.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
        this.prevTrust = trustLVL;
		this.ropeBroken = ropeBroken
		this.connected = false;
	},

	create: function()
	{
        console.log( 'Level_2: lvl == ' + this.lvl );

        // load background
    	setBg( game, this.trustLVL );

        // set up sign to appear later
        this.sign = game.add.image( game.world.width - 80, game.world.height - 60, 'sign' );
        this.sign.anchor.setTo( 0.5, 1 );        
        this.sign.visible = false;

        // Set up fly boi!
        this.flyTextBox = game.add.image( game.world.centerX + 15, game.world.centerY + 3, 'preBond' );
        this.flyTextBox.anchor.setTo( 0, 1 );
        this.flyTextBox.scale.setTo( 0.5 );
        var fly = new Fly( game, game.world.centerX, game.world.centerY, 'fly', 'fly1' );
        game.add.existing( fly );

		// set up level
		map = game.add.tilemap( 'level_2' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );

        // Resetting bounds to the world after resize
        game.physics.p2.setBoundsToWorld( true, true, false, false, false );

		// Setting up world properties
        game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set players new positions
		player1 = new Player1( game, game.world.width - 100, 0, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );

	    player2 = new Player2( game, 80, 0, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );

        // invisible barrier offscreen just for polish
        var barrier = game.add.sprite( game.world.width + 50, game.world.height - 54, 'barrier' );
        barrier.scale.setTo( 20, 1 );
        barrier.alpha = 0;
        game.physics.p2.enable( barrier );
        barrier.body.static = true;

        // Add sound to be used
        this.stringForm = game.add.audio( 'stringForm' );
	},

	update: function()
	{
		// Once players 'meet' connect them together with string
		if( ( this.ropeBroken == true && this.connected == false ) && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) < 100 ) )
		{
			// Connect the players together
			this.stringForm.play( '', 0, 0.6, false );
			createRope( game, player1, player2 );
			this.ropeBroken = false;
			this.connected = true;
            game.physics.p2.setBoundsToWorld( true, false, false, false, true );
            this.sign.visible = true;
            this.flyTextBox.visible = false;
            this.flyTextBox = game.add.image( game.world.centerX + 15, game.world.centerY + 3, 'madeBuddy' );
            this.flyTextBox.anchor.setTo( 0, 1 );
            this.flyTextBox.scale.setTo( 0.5 );

		}

		// Update string sprite
		if( this.ropeBroken != true && this.connected == true )
		{
			drawRope( player1, player2 );
		}

		// Check if players have broken string or have fallen
		if( ( this.ropeBroken != true && this.connected == true ) && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			breakString( game, player1, player2, ropeBroken );
            this.ropeBroken = true;
			game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 75 || player2.body.y > game.world.height + 75 )
        {
        	this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.prevTrust, this.ropeBroken );
        }

        // Check if players are progressing to next screen
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
        	game.state.start( 'Level_3', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }
	}

}