// Play state

var Play = function( game ) {};
Play.prototype = 
{
    create: function()
    {
        // reset emote speed, level, and EXTREME mode
        emoteSpeed = -450;
        level = 0;
        extremeMode = false;

        // setup bgm
        this.bg_music = game.add.audio( 'bg_music' );
        this.bg_music.play( '', 0, 1, true );

        // add player
        player = game.add.sprite( 32, game.height/2, 'player' );
        player.anchor.set( 0.5 );
        player.destroyed = false;   // custome property to track player life

        // player physics
        game.physics.enable( player, Phaser.Physics.ARCADE );
        paddle.body.maxVelocity.set( 600 );
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;

        
    }
}