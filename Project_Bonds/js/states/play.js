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
        game.physics.startSystem( Phaser.Physics.ARCADE );

        // Create platforms group
        platforms = game.add.group();
        platforms.enableBody = true;

        // Create platform group
        var platform = platforms.create( game.world.width/2, game.world.height - 150, 'platform' );
        platform.body.immovable = true;
        platform.scale.setTo( 0.5, 0.5 );

        // Create player and enable physics
        player1 = game.add.sprite( game.world.width/4, 0, 'player' );
        player1.scale.setTo( 0.5, 0.5 );
        game.physics.arcade.enable( player1 );
        player1.body.gravity.y = 8000;
        player1.body.collideWorldBounds = true;

        player2 = game.add.sprite( game.world.width/2, 0, 'buddy' );
        player2.scale.setTo( 0.5, 0.5 );
        game.physics.arcade.enable( player2 );
        player2.body.gravity.y = 8000;
        player2.body.collideWorldBounds = true;

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
        var hitPlatformP1 = game.physics.arcade.collide( player1, platforms );

        // Set up player1 movement and animations, if not moving then set velocity to 0
        player1.body.velocity.x = 0;
        if( cursors.left.isDown )
        {
            player1.body.velocity.x = -1500;
        }
        else if( cursors.right.isDown )
        {
            player1.body.velocity.x = 1500;
        }

        // Allow the player to jump if they are touching the ground
        if( ( cursors.up.isDown && player1.body.blocked.down ) || ( cursors.up.isDown && player1.body.touching.down ))
        {
            player1.body.velocity.y = -1750;
        }

        var hitPlatformP2 = game.physics.arcade.collide( player2, platforms );
        // Set up player2 movement and animations, if not moving then set velocity to 0
        player2.body.velocity.x = 0;
        if( game.input.keyboard.isDown( Phaser.Keyboard.A ) )
        {
            player2.body.velocity.x = -1500;
        }
        else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) )
        {
            player2.body.velocity.x = 1500;
        }

        // Allow the player to jump if they are touching the ground
        if( ( game.input.keyboard.isDown( Phaser.Keyboard.W ) && player2.body.blocked.down ) || 
            ( game.input.keyboard.isDown( Phaser.Keyboard.W ) && player2.body.touching.down ))
        {
            player2.body.velocity.y = -1750;
        }

    }
};