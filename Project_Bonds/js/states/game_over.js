// Game Over State

var Game_Over = function ( game ) {};
Game_Over.prototype = 
{
	init: function ( trustLVL, ropeBroken )
	{
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
			game.state.start( 'Level_2', true, false, this.trustLVL, this.ropeBroken );
		}
	}
}