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

        // Create ground platform for player
        var ground = platforms.create( 0, game.world.height - 64, 'platoform' );
        ground.scale.setTo( 2, 2 );
        ground.body.immovable = true;

        // Create player and enable physics
        player = game.add.sprite( game.world.width/2, 0, 'player' );
        game.physics.arcade.enable( player );
        player.body.gravity.y = 2000;
        player.body.collideWorldBounds = true;

        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create collectibles group
        balls = game.add.group();
        
    }
}