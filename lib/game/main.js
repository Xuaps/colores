ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.rojo',
	'game.levels.naranja',
	'game.levels.amarillo',
	'game.entities.Back',
	'game.entities.Next'
	//,'impact.debug.debug'
)
.defines(function(){
	RedGame = ig.Game.extend({
		font_black: new ig.Font( 'media/garab_black.font.png' ),
		font_white: new ig.Font( 'media/garab_white.font.png' ),
		bgtune: new ig.Sound( 'media/background.*', false ),
		volume: 0.5,
		
		init: function() {
			this.loadLevel(LevelRojo);
			
			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			music.play();

			ig.input.bind( ig.KEY.MOUSE1, 'click' );

			ig.game.spawnEntity(EntityNext, 2004, 1448, 
				{
					pressedUp:function(){
						ig.system.setGame(OrangeGame);
					}
				});
		},
		
		draw: function() {
			this.parent();
			
			this.font_black.draw( '¡Hola! Yo soy el color Rojo.', 512, 1088, ig.Font.ALIGN.CENTER );
			this.font_white.draw('Puedes encontrarme en comida tan rica...\n¡como las fresas! ¡Mmm!', 1536, 80, ig.Font.ALIGN.CENTER);
		}
	});

	OrangeGame = ig.Game.extend({
		font_black: new ig.Font( 'media/garab_black.font.png' ),
		font_white: new ig.Font( 'media/garab_white.font.png' ),
		
		init: function() {
			// Initialize your game here; bind keys etc.
			this.loadLevel(LevelNaranja);

			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			ig.game.spawnEntity(EntityNext, 2004, 1448, 
				{
					pressedUp:function(){
						ig.system.setGame(YellowGame);
					}
				});
			ig.game.spawnEntity(EntityBack, 44, 1448, 
				{
					pressedUp:function(){
						ig.system.setGame(RedGame);
					}
				});
		},

		draw: function() {
			this.parent();
			
			this.font_black.draw( 'Pues yo me llamo Naranja.', 512, 1088, ig.Font.ALIGN.CENTER );
			this.font_white.draw('Soy tan famoso\nque hasta una fruta lleva mi nombre.', 1536, 80, ig.Font.ALIGN.CENTER);
		}
	});

	YellowGame = ig.Game.extend({
		font_black: new ig.Font( 'media/garab_black.font.png' ),
		font_white: new ig.Font( 'media/garab_white.font.png' ),
		
		init: function() {
			// Initialize your game here; bind keys etc.
			this.loadLevel(LevelAmarillo);

			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			ig.game.spawnEntity(EntityNext, 2004, 1448, 
				{
					pressedUp:function(){
						//ig.system.setGame(OrangeGame);
					}
				});
			ig.game.spawnEntity(EntityBack, 44, 1448, 
				{
					pressedUp:function(){
						ig.system.setGame(OrangeGame);
					}
				});
		},

		draw: function() {
			this.parent();
			
			this.font_black.draw( '¡Aquí estoy!\nSoy el color Amarillo.', 512, 1088, ig.Font.ALIGN.CENTER );
			this.font_black.draw('Fíjate cómo salgo\nde los rayos del sol.', 1536, 1088, ig.Font.ALIGN.CENTER);
		}
	});

	ig.main( '#canvas', RedGame, 60, 2048, 1536,  1);
	ig.$('#canvas').style.width=ig.global.innerWidth+'px';
	ig.$('#canvas').style.height=768*(ig.global.innerWidth/1024)+'px';
	
});
