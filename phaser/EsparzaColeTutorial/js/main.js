// ============================================================================
// file: main.js
// ============================================================================
// Programmer: Cole Esparza
// Date: 04/18/2019
// Class: CMPM 140 ("Game Development Experience")
// Time: MWF 2:40-3:45PM (Jack Baskin Auditorium 101)
// Instructor: Professor Nathan Altice
// Project: Snowy States
//
// Description:
//				For your second programming assignment you're going to build
//				upon the demo you made. You will turn that demo into a multi-
//				state game and use a prefab to create a snow storm.
//
// ============================================================================

var game = new Phaser.Game( 600, 800, Phaser.AUTO, 'phaser' ); 

//define MainMenu state and methods
var MainMenu = function ( game ) {};
MainMenu.prototype = 
{	

    preload: function()
    {
        console.log( 'MaineMenu: preload' );
        // preload assets
        this.load.path = 'assets/img/';
        this.load.image( 'sky', 'sky.png' );
        this.load.image( 'ground', 'platform.png' );
        this.load.image( 'star', 'star.png' );
        this.load.image( 'diamond', 'diamond.png' );
        this.load.image( 'snow', 'firstaid.png' );
        this.load.spritesheet( 'dude', 'dude.png', 32, 48 );
        this.load.spritesheet( 'baddie', 'baddie.png', 32, 32 );

        //preload audio
        this.load.path = 'assets/audio/';
        this.load.audio( 'pop01', ['pop01.mp3'] );
        this.load.audio( 'pop02', ['pop02.mp3'] );
        this.load.audio( 'pop03', ['pop03.mp3'] );
    },//End of 'preload' function

	create: function()
	{
        console.log( 'MainMenu: create' );
		//Set background color for MainMenu
        var bg = "#1c3359";
		game.stage.backgroundColor = bg;

		//Print MainMenu messages to screen
        game.add.text( 0, 0, 'Star Catch Game', { fontSize: '32px', fill: '#000' } );
        game.add.text( 0, 48, 'Use Arrow Keys to Move', { fontSize: '32px', fill: '#000' } );
        game.add.text( 0, 96, 'Press [SPACE] to Start', { fontSize: '32px', fill: '#000' } );
	},//End of 'create' function

	update: function()
	{
        console.log( 'MainMenu: update' );
		//MainMenu logic
		if( game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR ) )
		{	
			//Pass any parameters to next state if needed
			// .start( key, clearWorld, clearCache, parameter )
			game.state.start( 'Play', true, false );
		}
	}//End of 'update' function

} // End of MainMenu State

//define Play state and methods
var Play = function( game ) {};
Play.prototype =
{
	init: function()
	{
        console.log( 'Play: init' );
		//Initialize score, scoreText, and starCollected variables
		this.score = 0;
		this.scoreText;
        this.starCollected = 0;
	},//End of 'init' function

    create: function()
    {
        console.log( 'Play: create' );
        // Enable arcade physics from PHASER
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Game background
        game.add.sprite(0, 0, 'sky');

        // Add audio
        this.pop01 = game.add.audio( 'pop01' );
        this.pop02 = game.add.audio( 'pop02' );
        this.pop03 = game.add.audio( 'pop03' );

        // Create platform group and enable physics and position on ground platform for player
        platforms = game.add.group();
        platforms.enableBody = true;                                            //Enable physics on platforms
        var ground = platforms.create(0, game.world.height - 64, 'ground');     //Spawn "ground" level platform
        ground.scale.setTo(2, 2);                                               //Set scale to fill width of screen
        ground.body.immovable = true;                                           //Set ground to be immovable

        // Create various ledges within the level
        var ledge = platforms.create(-200, 450, 'ground');
        ledge.body.immovable = true;                                            //Set platform to be immovable
        ledge = platforms.create(-300, 200, 'ground');
        ledge.body.immovable = true;                                            //Set platform to be immovable
        ledge = platforms.create( 475, 350, 'ground');
        ledge.body.immovable = true;                                            //Set platform to be immovable
        ledge = platforms.create( 325, 600, 'ground');
        ledge.body.immovable = true;                                            //Set platform to be immovable

        // Create the player and adjust their physics
        player = game.add.sprite(146, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);                                     //Enable physics to player
        player.body.bounce.y = 0.2;                                             //Add bounce to player
        player.body.gravity.y = 200;                                            //Give player a light gravity
        player.body.collideWorldBounds = true;                                  //Confide player to bounds of the screen
        player.animations.add('left', [0, 1, 2, 3], 10, true);                  //Create animation for walking left
        player.animations.add('right', [5, 6, 7, 8], 10, true);                 //Create animation for walking right

        // Create the enemies group
        enemies = game.add.group();
        enemies.enableBody = true;                                              //Enable physics on enemies
        var enemy = enemies.create( 35, 390, 'baddie' );
        enemy.body.gravity.y = 1000;                                            //Give gravity to enemy
        enemy.animations.add( 'left', [ 0, 1 ], 10, true );                     //Enable first enemy to face left and have walk animation
        enemy.animations.play( 'left', null, true, false );
        enemy = enemies.create( 450, 560, 'baddie' );
        enemy.body.gravity.y = 1000;                                            //Give gravity to enemy
        enemy.animations.add( 'right', [ 3, 2 ], 10, true );                    //Enable second enemy to face right and have walk animation
        enemy.animations.play( 'right', null, true, false );

        // Create the diamond group
        diamonds = game.add.group();
        diamonds.enableBody = true;
        var diamond = diamonds.create( 100 + Math.random() * 350, Math.random() * (game.world.height - 420), 'diamond'); //Random spawning location in sky

        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create the stars group
        stars = game.add.group();
        stars.enableBody = true;                                                //Enable physics on stars

        // Generate stars evenly spaced througout screen
        for( var i = 0; i < 9; i++ )
        {
            var star = stars.create( i * 70, 0, 'star');
            star.body.gravity.y = 700;                                          //Give stars gravity to fall from sky
            star.body.bounce.y = 0.7 + Math.random() * 0.2;                     //Give random stars different bounce values
            this.starCollected += 1;
        } 

        // Create snow storm group
        //snowstorm = game.add.group();
        //snowstorm.enableBody = true;
        
        for( var i = 0; i < 100; i++ )
        {
            this.snow = new Snowstorm( game, 'snow', 'snow', 0.75, Math.PI );
            game.add.existing( this.snow )
        }
        // Set-up for scoreText variable
        scoreText = game.add.text( 16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' } );

    },//End of 'create' function

    update: function()
    {
        console.log( 'Play: update' );
        // Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);

        // Set up player movement and animations, if not moving then set velocity to 0
        player.body.velocity.x = 0;
        if( cursors.left.isDown )
        {
            player.body.velocity.x = -150;                                      //Set speed for player movement
            player.animations.play( 'left' );                                   //Play left walking animation
        }
        else if( cursors.right.isDown )
        {
            player.body.velocity.x = 150;                                       //Set speed for player movement
            player.animations.play( 'right' );                                  //Play right walking animation
        }
        else
        {
            player.animations.stop();                                           //When not moving have player face camera
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
        if( game.physics.arcade.overlap(player, stars, collectStar, null, this) )
        {
            this.playPop();
        }
        // Check if player collides with an enemy
        if ( game.physics.arcade.overlap(player, enemies, hitEnemy, null, this) )
        {
            //Pass any parameters to next state if needed
            // .start( key, clearWorld, clearCache, parameter )
            game.state.start( 'GameOver', true, false, this.score )
        }
        // Check if player collides with diamond
        if ( game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this) )
        {
            this.playPop();
        }

        // Check if player collected all stars
        if( this.starCollected == 0 )
        {
            //Pass any parameters to next state if needed
            // .start( key, clearWorld, clearCache, parameter )
            game.state.start( 'GameOver', true, false, this.score )
        }

    },//End of 'update' function

    playPop: function()
    {
        //play one of three pop sounds at random
        switch( Math.floor( Math.random() * 3 ) )
        {
            //( 'marker', start position, volume ( 0 - 1 ), loop )
            case 0:
                    this.pop01.play( '', 0, 1, false );
                    break;
            case 1:
                    this.pop02.play( '', 0, 1, false );
                    break;
            case 2:
                    this.pop03.play( '', 0, 1, false );
                    break;
            default:
                    console.log( 'ERROR' );
        }
    }//End of 'playPop' function

}//End of Play State

//define GameOver state and methods
var GameOver = function( game ) {};
GameOver.prototype = 
{
    init: function( fscore )
    {
        console.log( 'GameOver: init' );
        this.score = fscore;
    },//End of 'init' function

    create: function()
    {
        console.log( 'GameOver: create' );
        //Set background color for MainMenu
        var bg = "#1c3359";
        game.stage.backgroundColor = bg;

        //Print MainMenu messages to screen
        game.add.text( 0, 0, 'Game Over', { fontSize: '32px', fill: '#000' } );
        game.add.text( 0, 48, 'Final Score: ' + this.score, { fontSize: '32px', fill: '#000' } );
        game.add.text( 0, 96, 'Press [SPACE] to Retry', { fontSize: '32px', fill: '#000' } );
    },//End of 'create' function

    update: function()
    {
        console.log( 'GameOver: update' );
        //GameOver logic
        if( game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR ) )
        {
            game.state.start('Play')
        }
    }//End of 'update' function
}//End of GameOver State

function collectStar( player, star )
{
	
	// Removes the star from the screen and play pop
	star.kill();
    //playPop();

	// Add and update the score
	this.score += 10;
    this.starCollected -= 1;
	scoreText.text = 'Score: ' + this.score;

}//End of 'collectStar' function

function hitEnemy( player, enemy )
{
	
	// Remove enemy collided with player
	enemy.kill();
	// Subtract and update teh score
	this.score -= 25;
	scoreText.text = 'Score: ' + this.score;

}//End of 'hitEnemy' function

function collectDiamond( player, diamond )
{
	
	// Removes the diamond from the screen
	diamond.kill();
    //playPop();
	// Add and update the score
	this.score += 50;
	scoreText.text = 'Score: ' + this.score;

}//End of 'collectDiamond' function


//add states to StateManager and start MainMenu
game.state.add( 'MaineMenu', MainMenu );
game.state.add( 'Play', Play );
game.state.add( 'GameOver', GameOver );
game.state.start( 'MaineMenu' );