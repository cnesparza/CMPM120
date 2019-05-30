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

		var endPlaque = game.add.image( game.world.centerX, game.world.centerY, 'end' );
		endPlaque.anchor.set( 0.5 );
		endPlaque.scale.set( 0.8 );
	},

	update: function()
	{
		if( game.input.keyboard.justPressed( Phaser.Keyboard.SPACEBAR ) )
		{

			if( levels[this.lvl] == "Menu" )
			{
				game.state.start( 'Menu', true, false, this.lvl, this.trustLVL, this.ropeBroken );				
			}
			else if( levels[this.lvl] == "Level_1" )
			{
				game.state.start( 'Level_1', true, false, this.lvl );				
			}
			else if( levels[this.lvl] == "Level_2" )
			{
				game.state.start( 'Level_2', true, false, this.lvl, this.trustLVL, true )
			}
			else if( levels[this.lvl] == "Level_3" )
			{
				game.state.start( 'Level_3', true, false, this.lvl, this.trustLVL, this.ropeBroken );
			}

		}
	}
}