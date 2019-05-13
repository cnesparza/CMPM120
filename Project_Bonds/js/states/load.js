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

		// load collectibles assets & level json and spritesheet
		game.load.path = 'assets/img/';
		game.load.tilemap( 'level', 'Bonds_Prototype_MeetPlayer1.json', null, Phaser.Tilemap.TILED_JSON );
        game.load.spritesheet( 'tilesheet', 'platfroms.png', 3, 3 );
        game.load.image( 'trust', 'stringBall.png' );

		// load menu assets
		game.load.path = 'assets/img/title_screen/';
		game.load.image( 'title', 'title.png' );
		game.load.image( 'button', 'button.png' );

		// load players
		game.load.path = 'assets/img/players/';
		game.load.atlas( 'player', 'fullbluespritesheet.png', 'fullbluesprites.json' );
        game.load.atlas( 'buddy', 'fullredspritesheet.png', 'fullredsprites.json' );
        
		// load platform assets
		game.load.path = 'assets/img/platforms/';
		game.load.image( 'platform', 'turq_long.png' );
		game.load.image( 'floor', 'floor.png' );

		// load hazard assets
		game.load.path = 'assets/img/hazards/';
		game.load.image( 'spike', 'orangeSpike.png' );

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio( 'bgm', ['new_bonds_edit.mp3'] );
	},

	create: function()
	{
		game.state.start( 'Menu', true, false );
	}
};