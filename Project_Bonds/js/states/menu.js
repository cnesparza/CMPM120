// Menu State

// main menu for endless runner game
var Menu = function( game ) {};
Menu.prototype =
{
    init: function()
    {
        this.lvl = 0;
    },

    create: function() 
    {
        // set up background color
        game.stage.backgroundColor = bg[0];

        // add menu screen text
        var logo = game.add.image( game.world.centerX, game.world.centerY, 'title' );
        logo.anchor.set( 0.5 );

        var button = game.add.button( game.world.centerX, game.world.centerY + 100, 'button', this.actionOnClick, this );
        button.anchor.set( 0.5 );

        var playText = game.add.text( game.world.centerX, game.world.centerY + 100, 'play', { fontSize: '32px', fill: '#000' } );
        playText.anchor.set( 0.5 );

        // begin playing bgm
        this.bgm = game.add.audio( 'bgm' );
        this.bgm.play( '', 0, 1, true );    // set bgm to loop
    },

    actionOnClick: function()
    {
        game.state.start( 'Level_1', true, false, ++this.lvl );
    }
};