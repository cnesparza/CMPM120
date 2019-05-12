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

        // Create platforms group
        platforms = game.add.group();
        platforms.enableBody = true;
        platforms.physicsBodyType = Phaser.Physics.P2JS;

        // Setting up world properties
        game.physics.p2.gravity.y = 9000;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness( 1e5 );

        // Create the floor
        var floor = platforms.create( 0, game.world.height, 'floor' );

        // Create platform
        var platform = platforms.create( game.world.width/2 + 100, game.world.height - 130, 'platform' );
        platform.scale.setTo( 1, 0.5 );

        // Add player sprites and enable phsysics
        player1 = game.add.sprite( game.world.width/4, game.world.height - 60, 'player', 'Asset 1' );
        player1.scale.setTo( 0.5, 0.5 );
        player2 = game.add.sprite( game.world.width/2, game.world.height - 60, 'buddy', 'redboi 5' );
        player2.scale.setTo( 0.5, 0.5 );
        
        // batch enable physics
        game.physics.p2.enable( [ player1, player2, platform, floor ], false );
        
        // Additional physics
        player1.body.fixedRotation = true;
        player2.body.fixedRotation = true;
        platform.body.setRectangle( 434, 54 );
        platform.body.static = true;
        floor.body.static = true;

        // set players together
        this.createRope( player1, player2 );
        //game.physics.p2.createSpring( player1, player2, 300, 10, 3 );


        // Create keyboard functionality
        cursors = game.input.keyboard.createCursorKeys();

        // Create collectibles group
        balls = game.add.group();
        balls.enableBody = true;
        var ball = balls.create( 550, game.world.height - 150, 'trust' );
        
    },

    update: function()
    {
        // Collide the player and the platforms
        //var hitPlatformP1 = game.physics.arcade.collide( player1, platforms );

        // Set up player1 movement and animations, if not moving then set velocity to 0
        if( cursors.left.isDown )
        {
            player1.body.velocity.x = -( plyrSpeed );
        }
        else if( cursors.right.isDown )
        {
            player1.body.velocity.x = plyrSpeed;
        }
        else
        {
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
        }
        else if( game.input.keyboard.isDown( Phaser.Keyboard.D ) )
        {
            player2.body.velocity.x = plyrSpeed;
        }
        else
        {
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
        this.rope = this.game.physics.p2.createSpring( p1, p2, 100, 80, 5 );

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