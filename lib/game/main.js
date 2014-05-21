ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.rojo',
	'game.levels.naranja',
	'game.levels.amarillo',
	'game.levels.green',
	'game.levels.azul',
	'plugins.debug',
	'plugins.touch-button'
	,'plugins.i18n'
	,'plugins.locales'
	//,'impact.debug.debug'
)
.defines(function(){

	MyGame = ig.Game.extend({
		font_black: new ig.Font( 'media/garab_black.font.png' ),
		font_white: new ig.Font( 'media/garab_white.font.png' ),
		font_black_ExImg:  [new ig.Image('media/garab_black2.font.png')],
		font_white_ExImg:  [new ig.Image('media/garab_white2.font.png')],
		volume: 0.5,
		bgtune: new ig.Sound( 'media/background2.*', false ),
		buttons: null,
		buttonNextImage: new ig.Image('media/flecha_derecha.png'),
		buttonBackImage: new ig.Image('media/flecha_izquierda.png'),
		levels: [LevelRojo, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul],
		currentLevel: 0,

		init: function() {
			this.loadLevel(this.levels[this.currentLevel]);

			this.font_white.extendFont(this.font_white_ExImg);
			this.font_black.extendFont(this.font_black_ExImg);

			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			//music.play();

			// For Desktop Browsers
        	ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        	ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        
	        // For Mobile Browsers and Ejecta
	        if( ig.ua.mobile ) {
	            this.buttons = new ig.TouchButtonCollection([
	                new ig.TouchButton( 'right', {right: 90, bottom: 100}, 59, 59, this.buttonNextImage, 0 ),
	                new ig.TouchButton( 'left', {left: 90, bottom: 100}, 59, 59, this.buttonBackImage, 0 ),
	            ]);
	            
	            // Align the touch buttons to the screen edges; you have 
	            // to call this function once after creating the 
	            // TouchButtonCollection and then every time you change 
	            // the game's screen size
	            this.buttons.align();
	        }
		},

		update: function(){
			this.parent();
			if(this.currentLevel!==this.levels.length-1 && ig.input.pressed('right') ) {
				this.currentLevel++;
			    this.loadLevel(this.levels[this.currentLevel]);
			}else if(this.currentLevel!==0 && ig.input.pressed('left')){
				this.currentLevel--;
			    this.loadLevel(this.levels[this.currentLevel]);
			}
		},
		
		draw: function() {
			this.parent();
			

			// Draw all touch buttons - if we have any
	        if( this.buttons ) {
	        	if(this.currentLevel!==0){
	        		this.buttons.buttons[1].draw();
	        	}
	        	if(this.currentLevel<this.levels.length){
		            this.buttons.buttons[0].draw();
	        	}
	        }

	        switch(this.currentLevel){
	        	case 0:
	        		this.font_black.draw(i18n.t("rojo.presentacion"), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_white.draw(i18n.t("rojo.frase"), 1536, 80, ig.Font.ALIGN.CENTER);
					break;
				case 1:
	        		this.font_black.draw(i18n.t("naranja.presentacion"), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_white.draw(i18n.t("naranja.frase"), 1536, 80, ig.Font.ALIGN.CENTER);
					break;
				case 2:
					this.font_black.draw(i18n.t('amarillo.presentacion'), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_black.draw(i18n.t('amarillo.frase'), 1536, 1088, ig.Font.ALIGN.CENTER);
					break;
				case 3:
					this.font_black.draw(i18n.t('verde.presentacion'), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_white.draw(i18n.t('verde.frase'), 1536, 80, ig.Font.ALIGN.CENTER);
					break;
				case 4:
					this.font_black.draw(i18n.t('azul.presentacion'), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_white.draw(i18n.t('azul.frase'), 1536, 80, ig.Font.ALIGN.CENTER);
					break;
	        }
			
		}
	});

	i18n.init({ resStore: ig.locales, lng: 'es-ES' }, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', MyGame, 60, 2048, 1536,  1);
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.$('#canvas').style.width=ig.global.innerWidth+'px';
		ig.$('#canvas').style.height=3*(ig.global.innerWidth/4)+'px';
	});
});
