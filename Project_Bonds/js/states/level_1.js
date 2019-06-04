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

    // load background
    var background = game.add.sprite( 0, 0, 'treebg' );
    background.alpha = 0.4;

    // load barriers to block players
    var barrier = game.add.sprite( game.world.width - 25, 100, 'barrier' );
    barrier.scale.setTo( 1, 5 );

    // Set up directional fly boi!
    var flyTextBox = game.add.image( game.world.width - 75, game.world.centerY + 120, 'followMe' );
    flyTextBox.anchor.setTo( 1, 1 );
    flyTextBox.scale.setTo( 0.5 );    
    var fly = new Fly( game, game.world.width - 50, game.world.centerY + 100, 'fly', 'bug 1', 1 );
    game.add.existing( fly );

    flyTextBox = game.add.image( 100, 120, 'thisWay' );
    flyTextBox.anchor.setTo( 0, 1 );
    flyTextBox.scale.setTo( 0.5 );
    fly = new Fly( game, 80, 100, 'fly', 'bug 1', -1 );
    game.add.existing( fly );

    // load images for controls
    var bControls = game.add.image( game.world.centerX, game.world.centerY + 25, 'p1_controls' );
    bControls.anchor.set( 0.5 );
    bControls.scale.setTo( 0.5 );

    var rControls = game.add.image( game.world.centerX, 80, 'p2_controls' );
    rControls.anchor.set( 0.5 );
    rControls.scale.setTo( 0.5 );

    // set up level
    map = game.add.tilemap( 'level_1' );
    map.addTilesetImage( 'platttspritesheet', 'tilesheet' );
    map.setCollisionByExclusion( [ ] );
    layer = map.createLayer( 'Tile Layer 1' );
    game.physics.p2.convertTilemap( map, layer );
    layer.resizeWorld();

    // Setting up world properties
    game.physics.p2.restitution = 0;
    game.physics.p2.gravity.y = 5000;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness( 1e5 );

    // Create player 1 function Player1( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player1 = new Player1( game, 80, game.world.height - 100, 'player', 'blue 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player1 );

    // Create player 2 function Player2( game, x, y, key, frame, plyrSpeed, plyrJump, scale, ropeBroken )
    player2 = new Player2( game, game.world.width - 100, 240, 'buddy', 'red 1', plyrSpeed, plyrJump, 0.5, ropeBroken );
    game.add.existing( player2 );

    // Set up collision between layer and players
    game.physics.p2.setBoundsToWorld( false, false, false, false, false );

	},

    update: function()
    {
        // Constrain velocity for both players
        this.constrainVelocity( player1.body, 5000 );
        this.constrainVelocity( player2.body, 5000 );
        
		if( player2.body.x < 0 && player1.body.x > game.width )
		{
			game.state.start( 'Level_2', true, false, ++this.lvl, this.trustLVL, true )
		}    	
    },

    //Code found here: 
    // http://www.html5gamedevs.com/topic/22461-p2-no-collision-at-certain-velocity/
    constrainVelocity: function( body, maxVelocity ) 
    {
        var angle, currVelocitySqr, vx, vy;
        vx = body.velocity.x;
        vy = body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) 
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.velocity.x = vx;
            body.velocity.y = vy;
        }
    }

}