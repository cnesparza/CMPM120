// Play state

var Play = function( game ) {};
Play.prototype = 
{
    init: function()
    {
        this.trustLVL = 0;
    },

    create: function()
    {
        // start physics engine for game
        game.physics.startSystem( Phaser.Physics.P2JS );

        // Create platforms group
        platforms = game.add.group();
        platforms.enableBody = true;

        // Gravity for world
        game.physics.p2.gravity.y = 8000;

        // Create platform group
        var platform = platforms.create( game.world.width/2, game.world.height - 150, 'platform' );
        platform.body.immovable = true;
        platform.scale.setTo( 0.5, 0.5 );


        // Add player sprites and enable phsysics
        player1 = game.add.sprite( game.world.width/4, game.world.height, 'player' );
        player1.scale.setTo( 0.5, 0.5 );
        player2 = game.add.sprite( game.world.width/2, game.world.height, 'buddy' );
        player2.scale.setTo( 0.5, 0.5 );
        // batch enable physics
        game.physics.p2.enable( [ player1, player2, platform ], false );
        
        // set players together
        game.physics.p2.createSpring( player1, player2, 15, 10, 100 );

        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create collectibles group
        balls = game.add.group();
        balls.enableBody = true;
        var ball = balls.create( 550, game.world.height - 150, 'trust' );
        
    },

    update: function()
    {
        // Collide the player and the platforms
        //var hitPlatformP1 = game.physics.arcade.collide( player1, platforms );

        // Set up player1 movement and animations, if not moving then set velocity to 0
        player1.body.velocity.x = 0;
        if( cursors.left.isDown )
        {
            player1.body.velocity.x = -( plyrSpeed );
        }
        else if( cursors.right.isDown )
        {
            player1.body.velocity.x = plyrSpeed;
        }

        // Allow the player to jump if they are touching the ground
        if( cursors.up.isDown )
        {
            player1.body.velocity.y = -1750;
        }

        var hitPlatformP2 = game.physics.arcade.collide( player2, platforms );
        // Set up player2 movement and animations, if not moving then set velocity to 0
        player2.body.velocity.x = 0;
        if( game.input.keyboard.isDown( Phaser.Keyboard.A ) )
        {
            player2.body.velocity.x = -( plyrSpeed );
        }
        else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) )
        {
            player2.body.velocity.x = plyrSpeed;
        }

        // Allow the player to jump if they are touching the ground
        if( game.input.keyboard.isDown( Phaser.Keyboard.W ) )
        {
            player2.body.velocity.y = -1750;
        }

    }
};