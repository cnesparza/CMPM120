// Menu State

// main menu for endless runner game
var Menu = function( game ) {};
Menu.prototype =
{
    create: function() 
    {
        // set up background color
        game.stage.backgroundColor = bg;

        // add menu screen text
        game.add.image( game.width/3, game.height/3, 'title' );

        var button = game.add.button( game.width/3 + 50, game.height * .7, 'button', this.actionOnClick, this );
        var playText = game.add.text( game.width/3 + 125, game.height * .7 + 20, 'play', { fontSize: '32px', fill: '#000' } );

        // begin playing bgm
        this.bgm = game.add.audio( 'bgm' );
        this.bgm.play( '', 0, 1, true );    // set bgm to loop
    },

    actionOnClick: function()
    {
        game.state.start( 'Level_1' );
    }
};