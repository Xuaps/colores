ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.rojo',
	'game.entities.SrStrawberry',
	'game.entities.Strawberry01',
	'game.entities.Strawberry02',
	'game.entities.Strawberry03'
	//'impact.debug.debug'
)
.defines(function(){	

MyGame = ig.Game.extend({
	
	// Load a font
	font_black: new ig.Font( 'media/garab_black.font.png' ),
	font_white: new ig.Font( 'media/garab_white.font.png' ),
	bgtune: new ig.Sound( 'media/background.*', false ),
	volume: 0.5,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelRojo);
		
		var music = ig.music;
		music.add(this.bgtune);
		music.volume = this.volume;
		//music.play();

		ig.input.bind( ig.KEY.MOUSE1, 'click' );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		this.font_black.draw( '¡Hola! Yo soy el color Rojo.', 512, 1088, ig.Font.ALIGN.CENTER );
		this.font_white.draw('Puedes encontrarme en comida tan rica...\n¡como las fresas! ¡Mmm!', 1536, 80, ig.Font.ALIGN.CENTER);
		//this.font_white.draw('', 768, 70, ig.Font.ALIGN.CENTER);
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 2048, 1536,  1);
ig.$('#canvas').style.width=ig.global.innerWidth+'px';
ig.$('#canvas').style.height=768*(ig.global.innerWidth/1024)+'px';
});
