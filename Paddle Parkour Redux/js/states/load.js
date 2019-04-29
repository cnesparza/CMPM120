// Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// setup loading bar
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);

		// load graphics assets
		game.load.path = 'assets/img/';
		game.load.image('paddle', 'paddle.png');
		game.load.image('fragment', 'fragment.png');
		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('beats', ['beats.mp3']);
		game.load.audio('clang', ['clang.mp3']);
		game.load.audio('death', ['death.mp3']);
	},
	create: function() {
		// check for local storage browser support
		if(window.localStorage) {
			console.log('Local storage supported');
		} else {
			console.log('Local storage not supported');
		}
		// go to Title state
		game.state.start('Title');
	}
};