// ====================================================================
// file: credits.js
// ====================================================================
// Programmer(s): Cole Esparza, Lezette De Paz, and Zoe Andrews
// Date: 5/4/2019
// Class: CMPM/ARTG 120 ("Game Design/Development Experience")
// Time: MWF 1:20-3:45PM (Jack Baskin Auditorium)
// Instructor: Professor(s) Elizabeth Swensen & Nathan Altice
// Project: Bonds
// ====================================================================
// Credits State

var Credits = function ( game ) {};
Credits.prototype =
{
	create: function()
	{
		var credits = game.add.image( game.world.centerX, game.world.centerY, 'credits' );
		credits.anchor.set( 0.5 );

		var button = game.add.button( game.world.centerX, game.world.height - 100, 'button', this.actionOnClick, this );
        button.anchor.set( 0.5 );
	},

	actionOnClick: function()
    {
        game.state.start( 'Menu', true, false );
    }
}