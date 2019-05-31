// Level 2 state

var Level_3 = function ( game ) {};
Level_3.prototype =
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
        this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.ropeBroken = ropeBroken;
	},

	create: function()
	{
        console.log( 'Level_3: lvl == ' + this.lvl );
		// set up level
		map = game.add.tilemap( 'level_3' );
		map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
		layer = map.createLayer( 'Tile Layer 1' );
		layer.resizeWorld();

        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );

        // Resetting bounds to the world after resize
        game.physics.p2.setBoundsToWorld( true, false, false, false, false );

		// Setting up world properties
        game.physics.p2.restitution = 0;
		game.physics.p2.gravity.y = 5000;
		game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		game.physics.p2.world.setGlobalStiffness( 1e5 );

		// Set players new positions
		player1 = new Player1( game, 50, game.world.height - 105, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player1 );

	    player2 = new Player2( game, 100, game.world.height - 105, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
	    game.add.existing( player2 );

        // Connect the players together
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

		// Check if players have broken string or have fallen
		if( this.ropeBroken != true && ( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 300 ) )
		{
			breakString( game, player1, player2 );
            this.ropeBroken = true;
			game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
		}
        else if( player1.body.y > game.world.height + 50 || player2.body.y > game.world.height + 50 )
        {
            this.ropeBroken = true;
            game.state.start( 'Game_Over', false, false, this.lvl, this.trustLVL, this.ropeBroken );
        }

        // Check if players are progressing to next screen
        if( ( this.ropeBroken != true ) && ( player1.body.x > game.world.width + 10 ) && ( player2.body.x > game.world.width + 10 ) )
        {
            game.state.start( 'Level_4', true, false, ++this.lvl, this.trustLVL, this.ropeBroken );
        }
	}

}