var game = new Phaser.Game(600, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;

function preload() {
	// preload assets
	game.load.image('sky', 'assets/img/sky.png');
	game.load.image('ground', 'assets/img/platform.png');
	game.load.image('star', 'assets/img/star.png');
	game.load.image('diamond', 'assets/img/diamond.png');
	game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);

}

function create() 
{
	// Enable arcade physics from PHASER
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Game background
	game.add.sprite(0, 0, 'sky');

	// Create platform group and enable physics and position on ground platform for player
	platforms = game.add.group();
	platforms.enableBody = true;
	var	ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	// Create various ledges within the level
	var ledge = platforms.create(-200, 450, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-300, 200, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create( 475, 350, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create( 325, 600, 'ground');
	ledge.body.immovable = true;

	// Create the player and adjust their physics
	player = game.add.sprite(146, game.world.height - 150, 'dude');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 200;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	// Create the enemies group
	enemies = game.add.group();
	enemies.enableBody = true;
	var enemy = enemies.create( 35, 390, 'baddie' );
	enemy.body.gravity.y = 1000;
	enemy.animations.add( 'left', [ 0, 1 ], 10, true );
	enemy.animations.play( 'left', null, true, false );
	enemy = enemies.create( 450, 560, 'baddie' );
	enemy.body.gravity.y = 1000;
	enemy.animations.add( 'right', [ 3, 2 ], 10, true );
	enemy.animations.play( 'right', null, true, false );

	// Create the diamond group
	diamonds = game.add.group();
	diamonds.enableBody = true;
	var diamond = diamonds.create( 100 + Math.random() * 350, Math.random() * (game.world.height - 420), 'diamond');

	// Create keyboard functionality
	cursors = game.input.keyboard.createCursorKeys();

	// Create the stars group
	stars = game.add.group();
	stars.enableBody = true;

	// Generate stars evenly spaced througout screen
	for( var i = 0; i < 9; i++ )
	{
		var star = stars.create( i * 70, 0, 'star');
		star.body.gravity.y = 700;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	} 

	// Set-up for scoreText variable
	scoreText = game.add.text( 16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' } );
}

function update() 
{

	// Collide the player and the stars with the platforms
	var	hitPlatform = game.physics.arcade.collide(player, platforms);

	// Set up player movement and animations, if not moving then set velocity to 0
	player.body.velocity.x = 0;
	if( cursors.left.isDown )
	{
		player.body.velocity.x = -150;
		player.animations.play( 'left' );
	}
	else if( cursors.right.isDown )
	{
		player.body.velocity.x = 150;
		player.animations.play( 'right' );
	}
	else
	{
		player.animations.stop();
		player.frame = 4;
	}

	// Allow the player to jump if they are touching the ground.
	if( cursors.up.isDown && player.body.touching.down && hitPlatform )
	{
		player.body.velocity.y = -350;
	}


	// Check that stars collide with the floor
	game.physics.arcade.collide( stars, platforms );
	// Check that enemies collide with the floor
	game.physics.arcade.collide( enemies, platforms );

	// Check that the player overlaps with a star or not
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	// Check if player collides with an enemy
	game.physics.arcade.overlap(player, enemies, hitEnemy, null, this);
	// Check if player collides with diamond
	game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
}

function collectStar( player, star )
{
	
	// Removes the star from the screen
	star.kill();
	// Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;

}

function hitEnemy( player, enemy )
{
	
	// Remove enemy collided with player
	enemy.kill();
	// Subtract and update teh score
	score -= 25;
	scoreText.text = 'Score: ' + score;

}

function collectDiamond( player, diamond )
{
	
	// Removes the diamond from the screen
	diamond.kill();
	// Add and update the score
	score += 50;
	scoreText.text = 'Score: ' + score;

}