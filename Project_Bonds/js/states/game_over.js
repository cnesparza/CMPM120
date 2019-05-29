// Game Over State

var Game_Over = function ( game ) {};
Game_Over.prototype = 
{
	init: function ( lastState, lvl, trustLVL, ropeBroken )
	{
		this.lvl = lvl;
		this.trustLVL = trustLVL;
		this.ropeBroken = ropeBroken;
	},
	create: function()
	{
		var endPlaque = game.add.image( game.world.centerX, game.world.centerY, 'end' );
		endPlaque.anchor.set( 0.5 );
		endPlaque.scale.set( 1.5 );
		var endText = game.add.text( game.world.centerX + 10, game.world.centerY + 10, 'Idiot...', { fontSize: '32px', fill: '#FFF' } );
		endText.anchor.set( 0.5 );
		var restartText = game.add.text( game.world.centerX, game.world.centerY + 50, 'Press R to restart', { fontSize: '16px', fill: '#FFF' } );
		restartText.anchor.set( 0.5 );
	},

	update: function()
	{
		if( game.input.keyboard.justPressed( Phaser.Keyboard.R ) )
		{
			if( levels[lvl] == "Menu" )
			{
				game.state.start( 'Menu', true, false, this.lvl, this.trustLVL, this.ropeBroken );				
			}
			else if( levels[lvl] == "Level_1" )
			{
				game.state.start( 'Level_1', true, false, this.lvl );				
			}

		}
	}
}