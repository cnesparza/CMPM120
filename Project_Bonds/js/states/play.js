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

        // Setting up world properties
        game.physics.p2.gravity.y = 5000;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness( 1e5 );

        // Add player sprites and enable phsysics
        player1 = game.add.sprite( 150, game.world.height - 60, 'player', 'blue 1' );
        player1.scale.setTo( 0.5, 0.5 );
        player2 = game.add.sprite( 200, game.world.height - 60, 'buddy', 'red 1' );
        player2.scale.setTo( 0.5, 0.5 );
        
        // batch enable physics
        game.physics.p2.enable( [ player1, player2 ], false );
        
        // Additional physics
        player1.body.fixedRotation = true;
        player2.body.fixedRotation = true;
        //dead_p1.body.static = true;
        
        //animations for the players
		player1.animations.add( 'left', [ 'blue 9', 'blue 10', 'blue 11', 'blue 12', 'blue 13', 'blue 14', 'blue 15', 'blue 16' ], 20, true );
        player1.animations.add( 'right', [ 'blue 1', 'blue 2', 'blue 3', 'blue 4', 'blue 5', 'blue 6', 'blue 7', 'blue 8' ], 20, true );
        player2.animations.add( 'left', [ 'red 9', 'red 10', 'red 11', 'red 12', 'red 13', 'red 14', 'red 15', 'red 16' ], 20, true );
        player2.animations.add( 'right', [ 'red 1', 'red 2', 'red 3', 'red 4', 'red 5', 'red 6', 'red 7', 'red 8' ], 20, true );

        // set players together
        this.createRope( player1, player2 );

        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create collectibles group
        //balls = game.add.group();
        //balls.enableBody = true;
        //var ball = balls.create( 550, game.world.height - 150, 'trust' );
        
    },

    update: function()
    {
        // Set up player1 movement and animations, if not moving then set velocity to 0
        if( cursors.left.isDown && this.ropeBroken != true )
        {
            player1.body.velocity.x = -( plyrSpeed );
        	player1.animations.play( 'left' );
        }
        else if( cursors.right.isDown && this.ropeBroken != true )
        {
            player1.body.velocity.x = plyrSpeed;
            player1.animations.play( 'right' );

        }
        else if( this.ropeBroken != true )
        {
            player1.animations.stop();
            player1.body.velocity.x = 0;
        }

        // Allow the player to jump if they are touching the ground
        if( ( cursors.up.isDown && game.time.now > jumpTimer && this.checkIfCanJump( player1 ) ) && this.ropeBroken != true )
        {
            player1.body.velocity.y = -( plyrJump );
            jumpTimer = game.time.now + 750;
        }


        // Set up player2 movement and animations, if not moving then set velocity to 0
        if( game.input.keyboard.isDown( Phaser.Keyboard.A ) && this.ropeBroken != true )
        {
            player2.body.velocity.x = -( plyrSpeed );
			player2.animations.play( 'left' );

        }
        else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) && this.ropeBroken != true )
        {
            player2.body.velocity.x = plyrSpeed;
			player2.animations.play( 'right' );
        }
        else if( this.ropeBroken != true )
        {
            player2.animations.stop();
            player2.body.velocity.x = 0;
        }

        // Allow the player to jump if they are touching the ground
        if( (game.input.keyboard.isDown( Phaser.Keyboard.W ) && game.time.now > jumpTimer && this.checkIfCanJump( player2 ) ) && this.ropeBroken != true )
        {
            player2.body.velocity.y = -( plyrJump );
            jumpTimer = game.time.now + 750;
        }

        // Update the string
        if( this.ropeBroken != true )
        {
            this.drawRope();    
        }
        

        // Check if we should call spring break method
        if( this.ropeBroken != true &&( Phaser.Math.distance( player1.body.x, player1.body.y, player2.body.x, player2.body.y ) > 250 ) )
        {
            this.breakString( player1, player2 );
        }
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
        this.rope = this.game.physics.p2.createSpring( p1, p2, 50, 25, 5 );

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
    },

    // Break String method
    breakString: function ( pl1, pl2 )
    {
        // Clear spring from players
        game.physics.p2.removeSpring( rope );
        this.ropeBroken = true;

        // Store coordinates for players
        var p1x = pl1.body.x;
        var p1y = pl1.body.y;
        var p2x = pl2.body.x;
        var p2y = pl2.body.y;

        // Destroy players and create death sprites
        pl1.destroy();
        pl2.destroy();
        pl1 = game.add.sprite( p1x, p1y, 'dead_player', 'bluedied 1' );
        pl1.scale.setTo( 0.5, 0.5 );
        pl1.animations.add( 'death', [ 'bluedied 1', 'bluedied 2', 'bluedied 3', 'bluedied 4', 'bluedied 5', 'bluedied 6', 'bluedied 7', 'bluedied 8', 'bluedied 9', 'bluedied 10', 'bluedied 11', 'bluedied 12' ], 20, true );
        pl2 = game.add.sprite( p2x, p2y, 'dead_buddy', 'reddied 1' );
        pl2.scale.setTo( 0.5, 0.5 );
        pl2.animations.add( 'death', [ 'reddied 1', 'reddied 2', 'reddied 3', 'reddied 4', 'reddied 5', 'reddied 6', 'reddied 7', 'reddied 8', 'reddied 9', 'reddied 10', 'reddied 11', 'reddied 12' ], 20, true );

        // batch enable physics
        game.physics.p2.enable( [ pl1, pl2 ], false );

        // Play death animation
        pl1.animations.play( 'death', null, false, false );
        pl2.animations.play( 'death', null, false, false ); 
        
    }
};