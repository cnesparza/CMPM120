// Play state

var Play = function( game ) {};
Play.prototype = 
{
    init: function()
    {
        this.trustLVL = 0;
    },

    create: function()
    {
        // start physics engine for game
        game.physics.startSystem( Phaser.Physics.P2JS );

        // set up collision groups for detection
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var platformCollisionGroup = game.physics.p2.createCollisionGroup();

        // set up level
        map = game.add.tilemap( 'level' );
        map.addTilesetImage( 'tilesheet_test', 'tilesheet' );

        //map.setCollisionBetween( 1, 12 );
        map.setCollisionByExclusion( [] );
        game.physics.p2.convertTilemap( map, layer );
        layer = map.createLayer( 'Tile Layer 1' );
        //layer.resizeWorld();

        // Create platforms group
        //platforms = game.add.group();
        //platforms.enableBody = true;
        //platforms.physicsBodyType = Phaser.Physics.P2JS;

        // Setting up world properties
        game.physics.p2.gravity.y = 5000;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        //game.physics.p2.world.setGlobalStiffness( 1e5 );

        // Create the floor
        //var floor = platforms.create( 0, game.world.height, 'floor' );

        // Create platform
        //var platform = platforms.create( game.world.width/2 + 100, game.world.height - 200, 'platform' );
        //platform.scale.setTo( 1, 0.5 );

        // Add player sprites and enable phsysics
        player1 = game.add.sprite( game.world.width/4, game.world.height - 60, 'player', 'blue 1' );
        player1.scale.setTo( 0.5, 0.5 );
        dead_p1 = game.add.sprite( game.world.width/4 * 3, game.world.height - 60, 'dead_player', 'bluefall 1' );
        //dead_p1.scale.setTo( 0.5, 0.5 );
        player2 = game.add.sprite( game.world.width/2, game.world.height - 60, 'buddy', 'red 1' );
        player2.scale.setTo( 0.5, 0.5 );
        
        // batch enable physics
        game.physics.p2.enable( [ player1, dead_p1, player2 ], false );
        
        // Additional physics
        player1.body.fixedRotation = true;
        player2.body.fixedRotation = true;
        dead_p1.body.static = true;
        //platform.body.setRectangle( 434, 54 );
        //platform.body.static = true;
        //floor.body.static = true;
        
        //animations for the players
		player1.animations.add( 'left', [ 'blue 9', 'blue 10', 'blue 11', 'blue 12', 'blue 13', 'blue 14', 'blue 15', 'blue 16' ], 20, true );
        player1.animations.add( 'right', [ 'blue 1', 'blue 2', 'blue 3', 'blue 4', 'blue 5', 'blue 6', 'blue 7', 'blue 8' ], 20, true );
        dead_p1.animations.add( 'dead', [ 'bluefall 1', 'bluefall 2', 'bluefall 3', 'bluefall 4', 'bluefall 5', 'bluefall 6', 'bluefall 7' ], 20, true );
        player2.animations.add( 'left', [ 'red 9', 'red 10', 'red 11', 'red 12', 'red 13', 'red 14', 'red 15', 'red 16' ], 20, true );
        player2.animations.add( 'right', [ 'red 1', 'red 2', 'red 3', 'red 4', 'red 5', 'red 6', 'red 7', 'red 8' ], 20, true );

        // set players together
        this.createRope( player1, player2 );
        //game.physics.p2.createSpring( player1, player2, 300, 10, 3 );
        dead_p1.animations.play( 'dead', null, false, false );

        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create collectibles group
        //balls = game.add.group();
        //balls.enableBody = true;
        //var ball = balls.create( 550, game.world.height - 150, 'trust' );
        
    },

    update: function()
    {
        // Collide the player and the platforms
        //var hitPlatformP1 = game.physics.arcade.collide( player1, platforms );

        // Set up player1 movement and animations, if not moving then set velocity to 0
        if( cursors.left.isDown )
        {
            player1.body.velocity.x = -( plyrSpeed );
        	player1.animations.play( 'left' );
        }
        else if( cursors.right.isDown )
        {
            player1.body.velocity.x = plyrSpeed;
            player1.animations.play( 'right' );

        }
        else
        {
            player1.animations.stop();
            player1.body.velocity.x = 0;
        }

        // Allow the player to jump if they are touching the ground
        if( cursors.up.isDown && game.time.now > jumpTimer && this.checkIfCanJump( player1 ) )
        {
            player1.body.velocity.y = -( plyrJump );
            jumpTimer = game.time.now + 750;
        }


        // Set up player2 movement and animations, if not moving then set velocity to 0
        if( game.input.keyboard.isDown( Phaser.Keyboard.A ) )
        {
            player2.body.velocity.x = -( plyrSpeed );
			player2.animations.play( 'left' );

        }
        else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) )
        {
            player2.body.velocity.x = plyrSpeed;
			player2.animations.play( 'right' );
        }
        else
        {
            player2.animations.stop();
            player2.body.velocity.x = 0;
        }

        // Allow the player to jump if they are touching the ground
        if( game.input.keyboard.isDown( Phaser.Keyboard.W ) && game.time.now > jumpTimer && this.checkIfCanJump( player2 ) )
        {
            player2.body.velocity.y = -( plyrJump );
            jumpTimer = game.time.now + 750;
        }

        this.drawRope();

    },

    // Code found for creating rope sprite: 
    //https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
    createRope: function( p1, p2 )
    {
        // Add bitmap data to draw the rope
        this.ropeBitmapData = game.add.bitmapData( this.game.world.width, this.game.world.height );

        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.lineWidth = "2";
        this.ropeBitmapData.ctx.strokeStyle = "#ffffff";
        this.ropeBitmapData.ctx.stroke();

        // Create a new sprite using the bitmap data
        this.line = game.add.sprite( 0, 0, this.ropeBitmapData );

        // Create a spring between the player and block to act as the ropoe
        this.rope = this.game.physics.p2.createSpring( p1, p2, 50, 50, 5 );

        // Draw a line from the players
        this.line = new Phaser.Line( p1.x, p1.y, p2.x, p2.y );
    },

    // Code found for drawing rope sprite: 
    //https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial
    drawRope: function() 
    {
        // Change the bitmap data to reflect the new rope position
        this.ropeBitmapData.clear();
        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.beginPath();
        this.ropeBitmapData.ctx.moveTo( player1.x, player1.y );
        this.ropeBitmapData.ctx.lineTo( player2.x, player2.y );
        this.ropeBitmapData.ctx.lineWidth = 2;
        this.ropeBitmapData.ctx.stroke();
        this.ropeBitmapData.ctx.closePath();
        this.ropeBitmapData.render();
    },

    // Code for checkIfCanJump function found:
    // https://phaser.io/examples/v2/p2-physics/platformer-material
    checkIfCanJump: function( player )
    {
        var result = false;

        for( var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++ )
        {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            
            if( c.bodyA === player.body.data || c.bodyB === player.body.data )
            {
                var d = p2.vec2.dot( c.normalA, yAxis );

                if( c.bodyA === player.body.data )
                {
                    d *= -1;
                }

                if( d > 0.5 )
                {
                    result = true;
                }
            }   
        }

        return result;
    }
};