// Load state

// used to load assets for creation in later state
var Load = function( game ) {};
Load.prototype =
{
	preload: function() 
	{
		//set up loading bar, thank you Professor Nathan Altice
		var loadingBar = this.add.sprite( game.width/2, game.height/2, 'loading' );
		loadingBar.anchor.set( 0.5 );
		game.load.setPreloadSprite( loadingBar );

		// load graphics assets
		game.load.path = 'assets/img/';
		game.load.sprite( 'player', 'datSheffy.png' );
		game.load.image( 'background', 'background.png' );

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio( 'bg_music', [ 'deja_vu_bgm.mp3' ] );
	}

	create: function()
	{
		game.state.start( 'Menu' );
	}
}