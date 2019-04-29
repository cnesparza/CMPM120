// Boot state

// used to jump into load state
var Boot = function( game ) {};
Boot.prototype = 
{
	preload: function() 
	{
		game.load.image( 'loading', 'assets/img/loading.png' );
	},

	create: function()
	{
		game.state.start( 'Load' );
	}
}