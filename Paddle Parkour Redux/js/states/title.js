// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'PADDLE PARKOUR', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var instructText = game.add.text(game.width/2, game.height/2 + 48, 'Use the UP + DOWN ARROWS to dodge color paddles and avoid getting REKT', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		instructText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press UP ARROW to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

		newHighScore = false;
	},
	update: function() {
		// check for UP input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
			game.state.start('Play');
		}
	}
};