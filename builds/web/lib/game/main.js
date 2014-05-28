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
	'game.levels.anil',
	'game.levels.settings',
	'plugins.debug',
	'plugins.touch-button',
	'plugins.check-touch-button',
	'plugins.i18n',
	'plugins.locales',
	'impact.debug.debug'
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
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		levels: [LevelRojo, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul, LevelAnil],
		currentLevel: 0,

		init: function() {
			this.loadLevel(this.levels[this.currentLevel]);

			this.font_white.extendFont(this.font_white_ExImg);
			this.font_black.extendFont(this.font_black_ExImg);

			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			//music.play();

            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'right', {right: 90, bottom: 100}, 59, 59, this.buttonNextImage, 0 ),
                new ig.TouchButton( 'left', {left: 90, bottom: 100}, 59, 59, this.buttonBackImage, 0 ),
                new ig.TouchButton( 'settings', {left: 90, top: 100}, 60, 60, this.buttonSettingsImage, 0 ),
            ]);
            
            this.buttons.align();
		},

		update: function(){
			this.parent();
			if(this.currentLevel!==this.levels.length-1 && ig.input.pressed('right') ) {
				this.currentLevel++;
				this.loadLevel(this.levels[this.currentLevel]);
			}else if(this.currentLevel!==0 && ig.input.pressed('left')){
				this.currentLevel--;
				this.loadLevel(this.levels[this.currentLevel]);
			}else if(ig.input.pressed('settings')){
				ig.system.setGame(SettingsGame);
			}
		},
		
		draw: function() {
			this.parent();
			
			if(this.currentLevel!==0){
				this.buttons.buttons[1].draw();
			}
			if(this.currentLevel<this.levels.length){
				this.buttons.buttons[0].draw();
			}
			this.buttons.buttons[2].draw();

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
				case 5:
					this.font_black.draw(i18n.t('anil.presentacion'), 512, 1088, ig.Font.ALIGN.CENTER );
					this.font_white.draw(i18n.t('anil.frase'), 1536, 80, ig.Font.ALIGN.CENTER);
					break;
			}
		}
	});
	
	SettingsGame = ig.Game.extend({
		buttonCheckImage: new ig.Image('media/check.png'),
		buttonOkImage: new ig.Image('media/aceptar.png'),
		buttonCancelImage: new ig.Image('media/cancelar.png'),
		buttons:null,

		init: function(){
			this.loadLevel(LevelSettings);
			this.clearColor='';
			this.buttons = new ig.TouchButtonCollection([
					new ig.CheckTouchButton( 'galego', {left:300, top: 520}, 60, 60, this.buttonCheckImage,0,1,0 ),
					new ig.CheckTouchButton( 'espanol', {left:300, top: 680}, 60, 60, this.buttonCheckImage,0,1,0 ),
					new ig.CheckTouchButton( 'ingles', {left:300, top: 820}, 60, 60, this.buttonCheckImage,0,1,0 ),
					new ig.CheckTouchButton( 'narracion', {left:1370, top: 520}, 60, 60, this.buttonCheckImage,0,1,0 ),
					new ig.CheckTouchButton( 'musica', {left:1370, top: 680}, 60, 60, this.buttonCheckImage,0,1,0 ),
					new ig.TouchButton( 'aceptar', {left:1920, top: 1410}, 60, 60, this.buttonOkImage,0,1,0 ),
					new ig.TouchButton( 'cancelar', {left:40, top: 1410}, 60, 60, this.buttonCancelImage,0,1,0 ),
				]);

			this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('cancelar') ) {
				ig.system.setGame(MyGame);
			}
		},

		draw: function(){
			this.parent();
			
			this.buttons.draw();
			ig.system.context.fillStyle="#FFFFFF";
			ig.system.context.textAlign = 'center';
			ig.system.context.font = '60pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("preferencias.titulo"), 1024, 150);
			ig.system.context.font = '48pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("preferencias.idioma"), 512, 370);
			ig.system.context.fillText(i18n.t("preferencias.sonido"), 1536, 370);
			ig.system.context.textAlign = 'left';
			ig.system.context.fillText(i18n.t("Galego"), 415, 570);
			ig.system.context.fillText(i18n.t("Español"), 415, 720);
			ig.system.context.fillText(i18n.t("English"), 415, 870);
			ig.system.context.fillText(i18n.t("preferencias.narracion"), 1450, 570);
			ig.system.context.fillText(i18n.t("preferencias.musica"), 1450, 720);
			ig.system.context.font = '38pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("preferencias.aceptar"), 1730, 1450);
			ig.system.context.fillText(i18n.t("preferencias.cancelar"), 120, 1450);
		}
	});

	i18n.init({ resStore: ig.locales, lng: 'es-ES' }, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', SettingsGame, 60, 2048, 1536,  1);
		//ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.$('#canvas').style.width=ig.global.innerWidth+'px';
		ig.$('#canvas').style.height=3*(ig.global.innerWidth/4)+'px';
	});
});
