// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		// check for high score in local storage
		if(localStorage.getItem('hiscore') != null) {
			let storedScore = parseInt(localStorage.getItem('hiscore'));
			console.log('storedScore: ' + storedScore);
			// see if current play is higher than stored score
			if (level > storedScore) {
				console.log('new high score: ' + level);
				localStorage.setItem('hiscore', level.toString());
				highScore = level;
				newHighScore = true;
			} else {
				console.log('no new high score :/');
				highScore = parseInt(localStorage.getItem('hiscore'));
				newHighScore = false;
			}
		// create local storage is none exists
		} else {
			console.log('No hi score stored. Creating new.');
			highScore = level;
			localStorage.setItem('hiscore', highScore.toString());
			newHighScore = true;
		}
		
		// add game over text
		if(newHighScore) {
			var newHighText = game.add.text(game.width/2, game.height/2 - 56, 'New Hi-Score!', {font: 'Helvetica', fontSize: '32px', fill: '#facade'});
			newHighText.anchor.set(0.5);
		}
		var rektText = game.add.text(game.width/2, game.height/2, 'You avoided getting REKT for ' + level + 's', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		rektText.anchor.set(0.5);
		
		var hiScoreText = game.add.text(game.width/2, game.height/2 + 56, 'This browser\'s best: ' + highScore + 's', {font: 'Helvetica', fontSize: '32px', fill: '#facade'});
		hiScoreText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press UP ARROW to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

	},
	update: function() {
		// wait for keyboard input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
			game.state.start('Play');
		}
	}
};