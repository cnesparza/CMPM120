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
        var menuText = game.add.text( game.width/2, game.height/2, 'BONDS', { fontSize: '48px', fill: '#000' } );
        menuText.anchor.set( 0.5 );

        var playText = game.add.text( game.width/2, game.height*.8, 'Press ENTER to Start', 
            { fontSize: '48px', fill: '#000' } );

        // begin playing bgm
        this.bgm = game.add.audio( 'bgm' );
        this.bgm.play( '', 0, 1, true );    // set bgm to loop
    },

    update: function()
    {
        //check for UP input
        if( game.input.keyboard.justPressed( Phaser.Keyboard.ENTER ) )
        {
            game.state.start( 'Play' );
        }
    }
};