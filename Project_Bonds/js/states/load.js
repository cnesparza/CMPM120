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
		game.load.tilemap( 'level_3', 'level_3.json', null, Phaser.Tilemap.TILED_JSON );
		game.load.tilemap( 'level_4', 'level_4.json', null, Phaser.Tilemap.TILED_JSON );
		game.load.tilemap( 'level_5', 'level_5.json', null, Phaser.Tilemap.TILED_JSON );
		game.load.tilemap( 'level_end', 'level_end.json', null, Phaser.Tilemap.TILED_JSON );
		game.load.image( 'sign', 'sign.png' );
        game.load.image( 'p1_controls', 'Arrows.png' );
        game.load.image( 'p2_controls', 'WAD.png' );
        game.load.image( 'barrier', 'barrier.png' );

		// load menu assets
		game.load.path = 'assets/img/title_screen/';
		game.load.image( 'title', 'title.png' );
		game.load.image( 'button', 'button.png' );
		game.load.image( 'end', 'endScreen.png' );

		// load fly sprite
		game.load.path = 'assets/img/sprites/';
		game.load.atlas( 'fly', 'bugspritesheet.png', 'bugsprites.json' );

		// load fly dialog boxes
		game.load.path = 'assets/img/dialog/';
		game.load.image( 'followMe', 'followMe.png' );
		game.load.image( 'thisWay', 'thisWay.png' );
		game.load.image( 'preBond', 'preBond.png' );
		game.load.image( 'madeBuddy', 'madeBuddy.png' );
		game.load.image( 'endGood', 'endGood.png' );
		game.load.image( 'endBad', 'endBad.png' );


		// load players
		game.load.path = 'assets/img/players/';
		game.load.atlas( 'player', 'fullbluespritesheet.png', 'fullbluesprites.json' );
		game.load.atlas( 'dead_player', 'bdiedspritesheet.png', 'bdiedsprites.json' );
        game.load.atlas( 'buddy', 'fullredspritesheet.png', 'fullredsprites.json' );
        game.load.atlas( 'dead_buddy', 'reddiedspritesheet.png', 'reddiedsprites.json' );

        // load background asset
        game.load.path = 'assets/img/backgrounds/';
        game.load.image( 'treebg', 'treebg.png' );
        game.load.image( 'treebg2', 'treebg2.png' );
        game.load.image( 'treebg3', 'treebg3.png' );
        
		// load platform assets
		game.load.path = 'assets/img/platforms/';
		game.load.spritesheet( 'tilesheet', 'platttspritesheet.png', 16, 16 );
		game.load.image( 'bluxlrg', 'bluxlrg.png' );
		game.load.image( 'blulrg', 'blulrg.png' );
		game.load.image( 'blumd', 'blumd.png' );
		game.load.image( 'blusm', 'blusm.png' );
		game.load.image( 'redxlrg', 'redxlrg.png' );
		game.load.image( 'redlrg', 'redlrg.png' );
		game.load.image( 'redmd', 'redmd.png' );
		game.load.image( 'redsm', 'redsm.png' );

		// load hazards
		game.load.path = 'assets/img/hazards/';
		game.load.image( 'bluSpike', 'blueSpike.png' );
		game.load.image( 'redSpike', 'redSpike.png' );
		game.load.image( 'purpSpike', 'purpleSpike.png' );
		game.load.image( 'uBluSpike', 'uBlueSpike.PNG' );
		game.load.image( 'uRedSpike', 'uRedSpike.PNG' );
		game.load.image( 'uPurpSpike', 'uPurpleSpike.PNG' );

		// load collectibles
		game.load.path = 'assets/img/collectibles/';
		game.load.image( 'jar', 'smjar.png' );
		
		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio( 'bgm', ['new_bonds_edit.mp3'] );
	},

	create: function()
	{
		game.state.start( 'Menu' );
	}
};