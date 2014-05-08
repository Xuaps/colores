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
	'game.entities.Sunrise'
	//'impact.debug.debug'
)
.defines(function(){	

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 0,
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelSunny);
		this.screen.x=200;
		this.screen.y=200;
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
ig.main( '#canvas', MyGame, 60, 600, 600, 1 );

});
