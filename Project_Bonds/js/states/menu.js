// Menu State

// main menu for endless runner game
var Menu = function( game ) {};
Menu.prototype =
{
    init: function()
    {
        this.lvl = 0;
    },

    create: function() 
    {
        // start physics engine for game
        game.physics.startSystem( Phaser.Physics.P2JS );
        
        // set up background color
        game.stage.backgroundColor = bg[0];

        // add menu screen text
        var logo = game.add.image( game.world.centerX, game.world.centerY, 'title' );
        logo.anchor.set( 0.5 );

        var button = game.add.button( game.world.centerX, game.world.centerY + 200, 'button', this.actionOnClick, this );
        button.anchor.set( 0.5 );

        // add button for credits screen
        var credits = game.add.button( game.world.centerX, game.world.centerY + 275, 'creditsButton', this.creditsClick, this );
        credits.anchor.set( 0.5 );   

        // play intro music, set up bgm
        game.sound.stopAll();
        bgm = game.add.audio( 'bgm' );
        this.intro = game.add.audio( 'intro' );
        this.intro.allowMultiple = false;

        if( this.intro.isPlaying == false )
        {
            this.intro.play( '', 0, 0.2, true );          
        }


        // [ D E B U G ]
        // button = game.add.button( 50, game.world.height - 50, 'button', this.clickLvl1, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 150, game.world.height - 50, 'button', this.clickLvl2, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 250, game.world.height - 50, 'button', this.clickLvl3, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 350, game.world.height - 50, 'button', this.clickLvl4, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 450, game.world.height - 50, 'button', this.clickLvl5, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 550, game.world.height - 50, 'button', this.clickLvl6, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 650, game.world.height - 50, 'button', this.clickLvl7, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );

        // button = game.add.button( 750, game.world.height - 50, 'button', this.clickLvlE, this );
        // button.anchor.set( 0.5 );
        // button.scale.set( 0.5 );
    },

    actionOnClick: function()
    {
        if( this.intro.isPlaying )
        {
            this.intro.stop();
        }
        
        bgm.play( '', 0, 0.1, true );
        game.state.start( 'Level_1', true, false, ++this.lvl );
    },

    creditsClick: function()
    {
        game.state.start( 'Credits', true, false );
    }
    // clickLvl1: function()
    // {
    //     game.state.start( 'Level_1', true, false, 1 );
    // },

    // clickLvl2: function()
    // {
    //     game.state.start( 'Level_2', true, false, 2, 0, true );
    // },

    // clickLvl3: function()
    // {
    //     game.state.start( 'Level_3', true, false, 3, 0, false );
    // },

    // clickLvl4: function()
    // {
    //     game.state.start( 'Level_4', true, false, 4, 0, false );
    // },

    // clickLvl5: function()
    // {
    //     game.state.start( 'Level_5', true, false, 5, 0, false );
    // },

    // clickLvl6: function()
    // {
    //     game.state.start( 'Level_6', true, false, 6, 0, false );
    // },

    // clickLvl7: function()
    // {
    //     game.state.start( 'Level_7', true, false, 7, 0, false );
    // },

    // clickLvlE: function()
    // {
    //     game.state.start( 'Level_End', true, false, 7, 0, false );
    // }            
};