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

		// load collectibles assets
		game.load.path = 'assets/img/';
		game.load.image( 'trust', 'stringBall.png' );

		// load menu assets
		game.load.path = 'assets/img/title_screen/';
		game.load.image( 'title', 'title.png' );
		game.load.image( 'button', 'button.png' );

		// load players
		game.load.path = 'assets/img/players/';
		game.load.spritesheet('bluewalk', 'bluespritesheet.png', )
		game.load.atlasJSONHash = ( 'player', 'blueboispritesheet.png', 'blueboisprites.json' );
		game.load.atlasJSONHash = ( 'buddy', 'redboispritesheet.png', 'redboisprites.json' );

		// load platform assets
		game.load.path = 'assets/img/platforms/';
		game.load.image( 'platform', 'turq_long.png' );
		game.load.image( 'floor', 'floor.png' );

		// load hazard assets
		game.load.path = 'assets/img/hazards/';
		game.load.image( 'spike', 'orangeSpike.png' );

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio( 'bgm', ['random1.mp3'] );
	},

	create: function()
	{
		game.state.start( 'Menu' );
	}
};