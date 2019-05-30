// Level 1 state

var Level_1 = function( game ) {};
Level_1.prototype =
{
	init: function( lvl )
	{
		this.trustLVL = 0;
		this.lvl = lvl;
	},

	create: function()
	{
    console.log( 'Level_1: lvl == ' + this.lvl );
	// start physics engine for game
    game.physics.startSystem( Phaser.Physics.P2JS );

    // Set up collision groups.
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var levelCollisionGroup = game.physics.p2.createCollisionGroup();

    // Set up directional fly boi!
    var fly = new Fly( game, game.world.width - 50, game.world.centerY + 100, 'fly', 'bug 1' );
    game.add.existing( fly );
    var flyTextBox = game.add.image( game.world.width - 75, game.world.centerY + 100, 'text_box' );
    flyTextBox.anchor.setTo( 1, 1 );
    flyTextBox.scale.setTo( 0.5 );

    var flyText = game.add.text( game.world.width - 147, game.world.centerY + 78, 'This way!', { fontSize: '26px', fill: '#FFF' } );
    flyText.anchor.set( 0.5 );

    // load images for controls
    var bControls = game.add.image( game.world.centerX, game.world.height - 300, 'p1_controls' );
    bControls.anchor.set( 0.5 );
    bControls.scale.setTo( 0.5 );

    var bctrlText = game.add.text( game.world.centerX, game.world.height - 235, 'blue player controls', { fontSize: '16px', fill: '#FFF' } );
    bctrlText.anchor.set( 0.5 );

    var rControls = game.add.image( game.world.centerX, 50, 'p2_controls' );
    rControls.anchor.set( 0.5 );
    rControls.scale.setTo( 0.5 );

    var rctrlText = game.add.text( game.world.centerX, 110, 'red player controls', { fontSize: '16px', fill: '#FFF' } );
    rctrlText.anchor.set( 0.5 );


    // set up level
    map = game.add.tilemap( 'level_1' );
    map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
    map.setCollisionByExclusion( [ ] );
    layer = map.createLayer( 'Tile Layer 1' );
    game.physics.p2.convertTilemap( map, layer );
    layer.resizeWorld();

    // Setting up world properties
    game.physics.p2.gravity.y = 5000;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness( 1e5 );

    // Create player 1 function Player1( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player1 = new Player1( game, 80, game.world.height - 100, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player1 );

    // Create player 2 function Player2( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player2 = new Player2( game, game.world.width - 100, 300, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player2 );

    // Set up collision between layer and players
    game.physics.p2.setBoundsToWorld( false, false, false, false, false );

	},

    update: function()
    {
		if( player2.body.x < 0 && player1.body.x > game.width )
		{
			game.state.start( 'Level_2', true, false, ++this.lvl, this.trustLVL, true )
		}    	
    }

}