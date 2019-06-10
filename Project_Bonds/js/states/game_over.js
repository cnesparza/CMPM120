// Game Over State

var Game_Over = function ( game ) {};
Game_Over.prototype = 
{
	init: function ( lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.ropeBroken = ropeBroken;
	},
	create: function()
	{
		console.log( 'Game_Over: current levels string == ' + levels[this.lvl] );
		var deathSound = game.add.audio( 'death' )

		var endPlaque = game.add.image( game.world.centerX, game.world.centerY, 'end' );
		endPlaque.anchor.set( 0.5 );
		endPlaque.scale.set( 0.8 );

		game.sound.pauseAll();
		deathSound.play( '', 0, 0.2, false );
	},

	update: function()
	{

		if( game.input.keyboard.justPressed( Phaser.Keyboard.SPACEBAR ) )
		{

			if( this.deathSound.isPlaying )
        	{
    	        this.deathSound.stop();
	        }

			game.sound.resumeAll();

			if( levels[this.lvl] == "Menu" )
			{
				game.state.start( 'Menu', true, false, this.lvl, this.trustLVL, this.ropeBroken );				
			}
			else if( levels[this.lvl] == "Tutorial" )
			{
				game.state.start( 'Level_1', true, false, this.lvl );				
			}
			else if( levels[this.lvl] == "Bonds" )
			{
				game.state.start( 'Level_2', true, false, this.lvl, this.trustLVL, true )
			}
			else if( levels[this.lvl] == "Level_1" )
			{
				game.state.start( 'Level_3', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}
			else if( levels[this.lvl] == "Level_2" )
			{
				game.state.start( 'Level_4', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}
			else if( levels[this.lvl] == "Level_3" )
			{
				game.state.start( 'Level_5', true, false, this.lvl, this.trustLVL, this.ropeBroken );				
			}
			else if( levels[this.lvl] == "Level_4" )
			{
				game.state.start( 'Level_6', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}
			else if( levels[this.lvl] == "Level_5" )
			{
				game.state.start( 'Level_7', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}
			else if( levels[this.lvl] == "Level_End" )
			{
				game.state.start( 'Level_End', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}

		}
	}
}