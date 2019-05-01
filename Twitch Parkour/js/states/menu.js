// Menu State

// main menu for endless runner game
var Menu = function( game ) {};
Menu.prototype =
{
    create: function() 
    {
        // add menu screen text
        var menuText = game.add.text( game.width/2, game.height/2, 'TWITCH PARKOUR', { fontSize: '48px', fill: '#000' } );
        menuText.anchor.set( 0.5 );

        var instructText = game.add.text( game.width/2, game.height/2 + 48, 'Use ARROW KEYS to maneuver around obstacles')
    }
}