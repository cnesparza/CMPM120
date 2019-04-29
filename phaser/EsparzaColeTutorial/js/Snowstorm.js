function Snowstorm( game, key, frame, scale, rotation )
{
	//call to Phaser.Sprite
	//new Sprite( game, x, y, key, frame )
	Phaser.Sprite.call( this, game, game.rnd.integerInRange( 15, game.width - 15 ), 
		game.rnd.integerInRange( 15, game.height - 15 ), key, frame );

	//add properties
	this.anchor.set( 0.5 );
	this.scale.x = scale;
	this.scale.y = scale;
	this.rotation = rotation;

    // additional physics properties
	game.physics.enable( this );
    this.alpha = 0.3;
    this.body.velocity.x = game.rnd.integerInRange( -300, 300 ); 
    this.body.velocity.y = game.rnd.integerInRange( 50, 150 ); 
	this.body.angularVelocity = game.rnd.integerInRange( -360, 360 );

}

Snowstorm.prototype = Object.create( Phaser.Sprite.prototype );
Snowstorm.prototype.constructor = Snowstorm;

Snowstorm.prototype.update = function()
{
	if( game.input.keyboard.justPressed( Phaser.Keyboard.R ) )
	{
		this.body.velocity.x *= -1;
	}

    game.world.wrap( this, 0, true )
}