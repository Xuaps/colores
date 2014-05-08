ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.inicial',
	'game.levels.sunny',
	'game.entities.Strawberry',
	'game.entities.Sunlight',
	'game.entities.Sunrise',
	'plugins.button'
	//'impact.debug.debug'
)
.defines(function(){	

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 0,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelInicial);
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.game.spawnEntity( Button, ig.system.width - 100, ig.system.height - 30, {
			  font: new ig.Font( 'media/04b03.font.png' ),
			  text: [ 'next' ],
			  textPos: { x: 37, y: 8 },
			  textAlign: ig.Font.ALIGN.CENTER,
			  size: { x: 75, y: 23 },
			  animSheet: new ig.AnimationSheet( 'media/button.png', 75, 23 ),
				
			  pressedDown: function() {
			    //console.log( 'pressedDown' );
			  },
			  pressed: function() {
			    ig.game.loadLevel(LevelSunny);
			  },
			  pressedUp: function() {
			    //console.log( 'pressedUp' );
			  }
			});
		},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		//var x = ig.system.width/2,
		//	y = ig.system.height/2;
		
		//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 1024, 768, 1 );

});
