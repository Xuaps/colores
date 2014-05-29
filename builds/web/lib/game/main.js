ig.module(
	'game.main'
)
.requires(
	'impact.debug.debug',
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
	'plugins.settings'
)
.defines(function(){

	MyGame = ig.Game.extend({
		font_black: new ig.Font( 'media/garab_black.font.png' ),
		font_white: new ig.Font( 'media/garab_white.font.png' ),
		font_black_ExImg:  [new ig.Image('media/garab_black2.font.png')],
		font_white_ExImg:  [new ig.Image('media/garab_white2.font.png')],
		volume: 0.2,
		bgtune: new ig.Sound( 'media/background2.*', false ),
		buttons: null,
		buttonNextImage: new ig.Image('media/flecha_derecha.png'),
		buttonBackImage: new ig.Image('media/flecha_izquierda.png'),
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		levels: [LevelRojo, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul, LevelAnil],
		currentLevel: 0,
		narration:null,

		init: function() {
			this.loadLevel(this.levels[this.currentLevel]);
			this.play_narration();

			this.font_white.extendFont(this.font_white_ExImg);
			this.font_black.extendFont(this.font_black_ExImg);

			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			if(ig.settings.music){
				music.play();
			}

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
				this.play_narration();
			}else if(this.currentLevel!==0 && ig.input.pressed('left')){
				this.currentLevel--;
				this.loadLevel(this.levels[this.currentLevel]);
				this.play_narration();
			}else if(ig.input.pressed('settings')){
				if(this.narration)
					this.narration.stop();
				ig.system.setGame(SettingsGame);
			}
		},
		
		draw: function() {
			this.parent();
			
			if(this.currentLevel!==0){
				this.buttons.buttons[1].draw();
			}
			if(this.currentLevel<this.levels.length-1){
				this.buttons.buttons[0].draw();
			}
			this.buttons.buttons[2].draw();

			this.font_black.draw(i18n.t(this.levels[this.currentLevel].name+".presentacion"), 512, 1088, ig.Font.ALIGN.CENTER );
			this.font_white.draw(i18n.t(this.levels[this.currentLevel].name+".frase"), 1536,
					(this.levels[this.currentLevel].name!=="LevelAmarillo")?80:1088, ig.Font.ALIGN.CENTER);
		},

		play_narration: function(){
			if(this.narration)
				this.narration.stop();
			if(ig.settings.narration){
				this.narration=new ig.Sound("media/"+i18n.t(this.levels[this.currentLevel].name+".audio"));
				this.narration.play();
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
			var gl=new ig.CheckTouchButton( i18n.languages.galician, {left:300, top: 520}, 60, 60, this.buttonCheckImage,0,1,i18n.languages.galician===ig.settings.language);
			var es=new ig.CheckTouchButton( i18n.languages.spanish, {left:300, top: 680}, 60, 60, this.buttonCheckImage,0,1,i18n.languages.spanish===ig.settings.language);
			var en=new ig.CheckTouchButton( i18n.languages.english, {left:300, top: 820}, 60, 60, this.buttonCheckImage,0,1, i18n.languages.english===ig.settings.language);

			gl.related_buttons=[es,en];
			es.related_buttons=[en,gl];
			en.related_buttons=[gl,es];
			this.buttons = new ig.TouchButtonCollection([
					gl,es,en,
					new ig.CheckTouchButton( 'narracion', {left:1370, top: 520}, 60, 60, this.buttonCheckImage,0,1,ig.settings.narration ),
					new ig.CheckTouchButton( 'musica', {left:1370, top: 680}, 60, 60, this.buttonCheckImage,0,1,ig.settings.music ),
					new ig.TouchButton( 'aceptar', {left:1920, top: 1410}, 60, 60, this.buttonOkImage,0,1,0 ),
					new ig.TouchButton( 'cancelar', {left:40, top: 1410}, 60, 60, this.buttonCancelImage,0,1,0 ),
				]);

			this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('cancelar') ) {
				ig.system.setGame(MyGame);
			}else if(ig.input.pressed('aceptar')){
				ig.settings.save();
				ig.system.setGame(MyGame);
			}else if(ig.input.pressed('musica')){
				ig.settings.music = !ig.settings.music;
				if(ig.settings.music){
					ig.music.play();
				}else{
					ig.music.stop();
				}
			}else if(ig.input.pressed('narracion')){
				ig.settings.narration = !ig.settings.narration;
			}else if(ig.input.pressed(i18n.languages.galician)){
				ig.settings.language = i18n.languages.galician;
				i18n.setLng(ig.settings.language);
			}else if(ig.input.pressed(i18n.languages.spanish)){
				ig.settings.language = i18n.languages.spanish;
				i18n.setLng(ig.settings.language);
			}else if(ig.input.pressed(i18n.languages.english)){
				ig.settings.language = i18n.languages.english;
				i18n.setLng(ig.settings.language);
			}
		},

		draw: function(){
			this.parent();
			
			this.buttons.draw();
			ig.system.context.fillStyle="#FFFFFF";
			ig.system.context.textAlign = 'center';
			ig.system.context.font = '60pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.titulo"), 1024, 150);
			ig.system.context.font = '48pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.idioma"), 512, 370);
			ig.system.context.fillText(i18n.t("LevelSettings.sonido"), 1536, 370);
			ig.system.context.textAlign = 'left';
			ig.system.context.fillText(i18n.t("Galego"), 415, 570);
			ig.system.context.fillText(i18n.t("Español"), 415, 720);
			ig.system.context.fillText(i18n.t("English"), 415, 870);
			ig.system.context.fillText(i18n.t("LevelSettings.narracion"), 1450, 570);
			ig.system.context.fillText(i18n.t("LevelSettings.musica"), 1450, 720);
			ig.system.context.font = '38pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.aceptar"), 1730, 1450);
			ig.system.context.fillText(i18n.t("LevelSettings.cancelar"), 120, 1450);
		}
	});

	i18n.init({ resStore: ig.locales, lng: ig.settings.language}, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', MyGame, 60, 2048, 1536,  1);
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.$('#canvas').style.width=ig.global.innerWidth+'px';
		ig.$('#canvas').style.height=3*(ig.global.innerWidth/4)+'px';
	});
});
