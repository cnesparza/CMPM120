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
		game.load.tilemap( 'level_1', 'level_1.json', null, Phaser.Tilemap.TILED_JSON );
		game.load.tilemap( 'level_2', 'level_2.json', null, Phaser.Tilemap.TILED_JSON );
        game.load.image( 'trust', 'stringBall.png' );
        game.load.image( 'p1_controls', 'arrows.png' );
        game.load.image( 'p2_controls', 'letters.png' );

		// load menu assets
		game.load.path = 'assets/img/title_screen/';
		game.load.image( 'title', 'title.png' );
		game.load.image( 'button', 'button.png' );
		game.load.image( 'end', 'endScreen.png' );

		// load players
		game.load.path = 'assets/img/players/';
		game.load.atlas( 'player', 'fullbluespritesheet.png', 'fullbluesprites.json' );
		game.load.atlas( 'dead_player', 'bdiedspritesheet.png', 'bdiedsprites.json' );
        game.load.atlas( 'buddy', 'fullredspritesheet.png', 'fullredsprites.json' );
        game.load.atlas( 'dead_buddy', 'reddiedspritesheet.png', 'reddiedsprites.json' );
        
		// load platform assets
		game.load.path = 'assets/img/platforms/';
		game.load.spritesheet( 'tilesheet', 'plattspritesheet.png', 16, 16 );
		game.load.spritesheet( 'tilesheet2', 'platttspritesheet.png', 16, 16 );
		game.load.image( 'b_plat', 'TurqPlat.png' );
		game.load.image( 'r_plat', 'RedPlat.png' );

		// load hazard assets
		// game.load.path = 'assets/img/hazards/';
		// game.load.image( 'spike', 'orangeSpike.png' );

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio( 'bgm', ['new_bonds_edit.mp3'] );
	},

	create: function()
	{
		game.state.start( 'Menu' );
	}
};