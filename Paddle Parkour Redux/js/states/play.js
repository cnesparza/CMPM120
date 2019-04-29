// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		// reset barrier speed, level, and EXTREME mode
		barrierSpeed = -450;
		level = 0;
		extremeMODE = false;

		// setup audio, play bgm
		this.beats = game.add.audio('beats');
		this.clang = game.add.audio('clang');
		this.death = game.add.audio('death');
		this.beats.play('', 0, 1, true);	// ('marker', start position, volume (0-1), loop)
		// allow multiple instances of clang to play simultaneously
		this.clang.allowMultiple = true;

		// add paddle
		paddle = game.add.sprite(32, game.height/2, 'paddle');
		paddle.anchor.set(0.5);
		paddle.destroyed = false;	// custom property to track paddle life
		// paddle physics
		game.physics.enable(paddle, Phaser.Physics.ARCADE);
		paddle.body.maxVelocity.set(600);
		paddle.body.drag.set(200);
		paddle.body.collideWorldBounds = true;
		paddle.body.bounce.set(0.5);
		paddle.body.immovable = true;

		// setup barrier group
		this.barrierGroup = game.add.group();
		this.addBarrier(this.barrierGroup);

		// setup difficulty timer
		this.difficultyTimer = game.time.create(false);	// .create(autoDestroy)
		this.difficultyTimer.loop(1000, this.speedBump, this); // .loop(delay, callback, callbackContext)
		this.difficultyTimer.start();	// don't forget to start the timer!!!!
	},
	speedBump: function() {
		// raise barrier speed, increment level
		barrierSpeed-= 10; 
		level++;
		// show timer outside canvas
		document.getElementById('gameTitle').innerHTML = 'Paddle Parkour: ' + level + 's';

		if(level%5 == 0) {
			// increase audio rate cuz we fancy
			this.beats._sound.playbackRate.value += 0.005;

			// play clang on level up
			this.clang.play('', 0, 0.75, false);

			// change CSS border color
			let color = colors[colorIndex].toString(16);	// get color at index, convert to hex
			if(colorIndex < colors.length-1) {	// increment next index value
				colorIndex++; 
			} else { 
				colorIndex = 0;
			}
			document.getElementById('myGame').style.borderColor = '#' + color;	// change border
			document.getElementById('gameTitle').style.color = '#' + color;	// change title
		}
		// implement HARD mode
		if(level == 30) {
			paddle.scale.y = 0.75;
		}
		// implement EXTREME mode
		if(level == 60) {
			paddle.scale.y = 0.5;
			extremeMODE = true;
		}
	},
	update: function() {
		// check for input
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			paddle.body.velocity.y -= paddleVelocity;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			paddle.body.velocity.y += paddleVelocity;
		}
		// check for collision
		if(!paddle.destroyed) {
			game.physics.arcade.collide(paddle, this.barrierGroup, this.paddleCollision, null, this);
		}

		// spawn rainbow trail if in extreme mode
		if(extremeMODE && !shadowLock && !paddle.destroyed) {
			this.spawnShadowPaddles();
			shadowLock = true;
			// lock spawning to a given time interval
			game.time.events.add(15, function() { shadowLock = false; });
		}
	},
	spawnShadowPaddles() {
		// add a "shadow paddle" at main paddle position
		let shadowPaddle = game.add.image(paddle.x, paddle.y, 'paddle');
		shadowPaddle.scale.y = paddle.scale.y;		// scale it
		shadowPaddle.anchor.setTo(0.5);					// set anchor
		shadowPaddle.x = paddle.x;					// reset position
		shadowPaddle.y = paddle.y;
		shadowPaddle.sendToBack();						// move to back of display list
		shadowPaddle.tint = Math.random() * 0xffffff;	// rainbow-ize
		shadowPaddle.alpha = 0.5;						// make semi-transparent
		// tween alpha to 0 .to({property}, duration, ease, autoStart)
		game.add.tween(shadowPaddle).to({ alpha: 0 }, 750, "Linear", true);
		// set a kill timer for trail effect
		game.time.events.add(750, function() { shadowPaddle.kill() });
	},
	addBarrier: function(group) {
		// construct new Barrier object, add it to the game world, and add it to the group
		var tintColor = colors[game.rnd.between(0, colors.length-1)]; // grab a random color
		var barrier = new Barrier(game, barrierSpeed, tintColor);
		game.add.existing(barrier);
		group.add(barrier);
	},
	paddleCollision: function(paddle, group) {
		paddle.destroyed = true;	// turn off collision checking
		this.difficultyTimer.stop();	// stop timer
		this.beats.fadeOut(500);		// fade music
		this.death.play('', 0, 0.5, false);	// play death knell

		// collision causes particle explosion
		// add.emitter(x, y, maxParticles)
		var deathEmitter = game.add.emitter(paddle.x, paddle.y, 200);
		deathEmitter.makeParticles('fragment');		// image used for particles
		deathEmitter.setAlpha(0.5, 1);				// set particle alpha (min, max)
		deathEmitter.minParticleScale = 0.25;		// set min/max particle size
		deathEmitter.maxParticleScale = 1;
		deathEmitter.setXSpeed(-50,500);			// set min/max horizontal speed
		deathEmitter.setYSpeed(-500,500);			// set min/max vertical speed
		deathEmitter.start(true, 2000, null, 200);	// (explode, lifespan, freq, quantity)

		paddle.kill();	// kill the paddle

		// switch states after timer expires
		// events.add(delay, callback)
		game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('GameOver')});
	}
};