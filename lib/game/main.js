ig.module(
	'game.main'
)
.requires(
	'impact.debug.debug',
	'impact.game',
	'game.levels.rojo',
	'game.levels.home',
	'game.levels.naranja',
	'game.levels.amarillo',
	'game.levels.green',
	'game.levels.azul',
	'game.levels.anil',
	'game.levels.violeta',
	'game.levels.todos',
	'game.levels.respuesta',
	'game.levels.settings',
	'game.levels.juego',
	'plugins.touch-button',
	'plugins.check-touch-button',
	'plugins.i18n',
	'plugins.locales',
	'plugins.settings',
	'plugins.whiteboard',
	'plugins.rollbar',
	'plugins.analytics'
)
.defines(function(){

	HomeGame = ig.Game.extend({
		volume: 0.2,
		bgtune: new ig.Sound( 'media/background2.*', false ),
		buttons: null,
		buttonSettingsImage: new ig.Image('media/preferencias_blanco.png'),
		buttonInfoImage: new ig.Image('media/informacion.png'),
		buttonStartImage: new ig.Image('media/flecha_derecha.png'),

		init: function() {
			this.loadLevel(LevelHome);

			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			if(ig.settings.music){
				music.play();
			}

            this.buttons = new ig.TouchButtonCollection([
				new ig.TouchButton( 'start', {right: 45, bottom: 50}, 30, 30, this.buttonStartImage, 0 ),
				new ig.TouchButton( 'info', {left: 45, bottom: 50}, 30, 30, this.buttonInfoImage, 0 ),
				new ig.TouchButton( 'settings', {left: 45, top: 50}, 30, 30, this.buttonSettingsImage, 0 ),
            ]);
            
            this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('settings')){
				ig.system.setGame(SettingsGame);
			}else if(ig.input.pressed('start')){
				ig.system.setGame(StoryGame);
			}else if(ig.input.pressed('info')){
				ig.system.setGame(PaintGame);
			}
		},
		
		draw: function() {
			this.parent();
			
			this.buttons.draw();

			this.buttons.draw();
			ig.system.context.fillStyle="#FFFFFF";
			ig.system.context.textAlign = 'center';
			ig.system.context.font = '30pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Home.titulo"), 512, 565);
			ig.system.context.font = '19pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Home.subtitulo"), 512, 600);

			ig.system.context.fillText(i18n.t("Home.prefrencias"), 150, 75);
			ig.system.context.fillText(i18n.t("Home.info"), 165, 710);
			ig.system.context.fillText(i18n.t("Home.comenzar"), 840, 710);
		},

		loadLevel: function(data){
			this.parent( data );

			for( var i = 0; i < this.backgroundMaps.length; i++ ) {
				this.backgroundMaps[i].preRender = true;
			}
		}
	});

	StoryGame = ig.Game.extend({
		buttons: null,
		buttonNextImage: new ig.Image('media/flecha_derecha.png'),
		blackButtonNextImage: new ig.Image('media/flecha_derecha_negra.png'),
		buttonBackImage: new ig.Image('media/flecha_izquierda.png'),
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		levels: [LevelRojo, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul, LevelAnil, LevelVioleta, LevelTodos, LevelRespuesta],
		currentLevel: 0,
		narration:null,

		init: function() {
			this.loadLevel(this.levels[this.currentLevel]);
			this.play_narration();

            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'right', {right: 45, bottom: 50}, 30, 30, this.buttonNextImage, 0 ),
                new ig.TouchButton( 'left', {left: 45, bottom: 50}, 30, 30, this.buttonBackImage, 0 ),
                new ig.TouchButton( 'settings', {left: 45, top: 50}, 30, 30, this.buttonSettingsImage, 0 ),
                new ig.TouchButton( 'right', {right: 45, bottom: 50}, 30, 30, this.blackButtonNextImage, 0 ),
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
				if(this.levels[this.currentLevel].name==="LevelTodos"){
					this.buttons.buttons[3].draw();
				}else{
					this.buttons.buttons[0].draw();
				}
			}
			this.buttons.buttons[2].draw();

			ig.system.context.textAlign = 'center';
			ig.system.context.font = '20pt Garamond-Bold';
			if(this.levels[this.currentLevel].name==="LevelRespuesta"){
				ig.system.context.fillStyle="#000000";
				this.print(i18n.t(this.levels[this.currentLevel].name+".correcto"), 768, 576, 30 );
			}else if(this.levels[this.currentLevel].name==="LevelTodos"){
				ig.system.context.fillStyle="#FFFFFF";
				this.print(i18n.t(this.levels[this.currentLevel].name+".amigos"), 256, 250, 30 );
				this.print(i18n.t(this.levels[this.currentLevel].name+".pregunta"), 256, 400, 30 );
			}else{
				ig.system.context.fillStyle="#000000";
				this.print(i18n.t(this.levels[this.currentLevel].name+".presentacion"), 256, 544, 30);
				ig.system.context.fillStyle="#FFFFFF";
				this.print(i18n.t(this.levels[this.currentLevel].name+".frase"), 768,
					(this.levels[this.currentLevel].name!=="LevelAmarillo")?40:544, 30);
			}
		},

		print:function(sentences, posX, posY, increment){
			sentences.split('\n').forEach(function(sentence){
				ig.system.context.fillText(sentence, posX, posY);
				posY+=increment;
			});
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

	PaintGame = ig.Game.extend({
		buttonBackImage: new ig.Image('media/flecha_izquierda.png'),
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		buttonTwitterImage: new ig.Image('media/boton_compartir.png'),
		buttonRedImage: new ig.Image('media/01_boton_rojo.png'),
		buttonOrangeImage: new ig.Image('media/02_boton_naranja.png'),
		buttonYellowImage: new ig.Image('media/03_boton_amarillo.png'),
		buttonGreenImage: new ig.Image('media/04_boton_verde.png'),
		buttonBlueImage: new ig.Image('media/05_boton_azul.png'),
		buttonIndigoImage: new ig.Image('media/06_boton_anil.png'),
		buttonVioletImage: new ig.Image('media/07_boton_violeta.png'),
		buttonEraserImage: new ig.Image('media/08_boton_goma.png'),
		buttons:null,
		whiteboard:null,
		clearColor: '#FFFFFF',
		
		init: function(){
			this.loadLevel(LevelJuego);


			var red=new ig.CheckTouchButton( "red", {left:120, bottom: 12}, 92, 92, this.buttonRedImage,1,0,true);
			var orange=new ig.CheckTouchButton( "orange", {left:212, bottom: 12}, 92, 92, this.buttonOrangeImage,1,0,false);
			var yellow=new ig.CheckTouchButton( "yellow", {left:304, bottom: 12}, 92, 92, this.buttonYellowImage,1,0,false);
			var green=new ig.CheckTouchButton( "green", {left:396, bottom: 12}, 92, 92, this.buttonGreenImage,1,0,false);
			var blue=new ig.CheckTouchButton( "blue", {left:488, bottom: 12}, 92, 92, this.buttonBlueImage,1,0,false);
			var indigo=new ig.CheckTouchButton( "indigo", {left:580, bottom: 12}, 92, 92, this.buttonIndigoImage,1,0,false);
			var violet=new ig.CheckTouchButton( "violet", {left:672, bottom: 12}, 92, 92, this.buttonVioletImage,1,0,false);
			var eraser=new ig.CheckTouchButton( "eraser", {left:764, bottom: 12}, 92, 92, this.buttonEraserImage,1,0,false);


			red.related_buttons=[orange,yellow,green,blue,indigo,violet,eraser];
			orange.related_buttons=[red,yellow,green,blue,indigo,violet,eraser];
			yellow.related_buttons=[red,orange,green,blue,indigo,violet,eraser];
			green.related_buttons=[red,orange,yellow,blue,indigo,violet,eraser];
			blue.related_buttons=[red,orange,yellow,green,indigo,violet,eraser];
			indigo.related_buttons=[red,orange,yellow,green,blue,violet,eraser];
			violet.related_buttons=[red,orange,yellow,green,blue,indigo,eraser];
			eraser.related_buttons=[red,orange,yellow,green,blue,indigo,violet];
			this.buttons = new ig.TouchButtonCollection([
				red,orange,yellow, green, blue, indigo, violet, eraser,
                new ig.TouchButton( 'left', {left: 45, bottom: 40}, 30, 30, this.buttonBackImage, 0 ),
                new ig.TouchButton( 'settings', {left: 45, top: 30}, 30, 30, this.buttonSettingsImage, 0 ),
                new ig.TouchButton( 'twitter', {right: 45, top: 20}, 30, 40, this.buttonTwitterImage, 0 ),
			]);

			this.buttons.align();
            this.whiteboard=new WhiteBoard(70,90,915, 560);
            this.whiteboard.curColor="#FF0000";
		},

		update: function(){
			this.parent();

			if(this.currentLevel!==0 && ig.input.pressed('left')){
				ig.system.setGame(HomeGame);
			}else if(ig.input.pressed('settings')){
				ig.system.setGame(SettingsGame);
			}else if(ig.input.pressed('twitter')){
				if(window.Ejecta){
					var social=new Ejecta.Social();
					social.gameWidth=ig.system.width;
					social.gameHeight=ig.system.height;
					social.post('twitter', '#colores', 'http://xuaps.com', null);
				}
			}else if(ig.input.pressed('red')){
				this.whiteboard.curColor="#FF0000";
			}else if(ig.input.pressed('orange')){
				this.whiteboard.curColor="#FF4719";
			}else if(ig.input.pressed('yellow')){
				this.whiteboard.curColor="#FFFF00";
			}else if(ig.input.pressed('green')){
				this.whiteboard.curColor="#009900";
			}else if(ig.input.pressed('blue')){
				this.whiteboard.curColor="#33CCFF";
			}else if(ig.input.pressed('indigo')){
				this.whiteboard.curColor="#0033CC";
			}else if(ig.input.pressed('violet')){
				this.whiteboard.curColor="#6600CC";
			}else if(ig.input.pressed('eraser')){
				this.whiteboard.curColor="#FFFFFF";
			}
		},

		draw: function(){
			this.parent();
			this.buttons.draw();
			if(this.clearColor!==''){
				this.clearColor= '';
			}

			ig.system.context.fillStyle="#000000";
			ig.system.context.textAlign = 'left';
			ig.system.context.font = '19pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Juego.titulo"), 80, 50);
			ig.system.context.textAlign = 'right';
			ig.system.context.fillText(i18n.t("Juego.compartir"), 935, 50);
		}
	});
	
	SettingsGame = ig.Game.extend({
		buttonCheckImage: new ig.Image('media/check.png'),
		buttonOkImage: new ig.Image('media/aceptar.png'),
		buttonCancelImage: new ig.Image('media/cancelar.png'),
		buttons:null,

		init: function(){
			this.loadLevel(LevelSettings);
			//this.clearColor='';
			var gl=new ig.CheckTouchButton( i18n.languages.galician, {left:150, top: 260}, 30, 30, this.buttonCheckImage,0,1,i18n.languages.galician===ig.settings.language);
			var es=new ig.CheckTouchButton( i18n.languages.spanish, {left:150, top: 340}, 30, 30, this.buttonCheckImage,0,1,i18n.languages.spanish===ig.settings.language);
			var en=new ig.CheckTouchButton( i18n.languages.english, {left:150, top: 410}, 30, 30, this.buttonCheckImage,0,1, i18n.languages.english===ig.settings.language);

			gl.related_buttons=[es,en];
			es.related_buttons=[en,gl];
			en.related_buttons=[gl,es];
			this.buttons = new ig.TouchButtonCollection([
				gl,es,en,
				new ig.CheckTouchButton( 'narracion', {left:685, top: 260}, 30, 30, this.buttonCheckImage,0,1,ig.settings.narration ),
				new ig.CheckTouchButton( 'musica', {left:685, top: 340}, 30, 30, this.buttonCheckImage,0,1,ig.settings.music ),
				new ig.TouchButton( 'aceptar', {left:960, top: 705}, 30, 30, this.buttonOkImage,0,1,0 ),
				new ig.TouchButton( 'cancelar', {left:20, top: 705}, 30, 30, this.buttonCancelImage,0,1,0 ),
				]);

			this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('cancelar') ) {
				ig.system.setGame(HomeGame);
			}else if(ig.input.pressed('aceptar')){
				ig.settings.save();
				ig.system.setGame(HomeGame);
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
			ig.system.context.font = '30pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.titulo"), 512, 75);
			ig.system.context.font = '24pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.idioma"), 256, 185);
			ig.system.context.fillText(i18n.t("LevelSettings.sonido"), 768, 185);
			ig.system.context.textAlign = 'left';
			ig.system.context.fillText(i18n.t("Galego"), 207, 285);
			ig.system.context.fillText(i18n.t("Español"), 207, 365);
			ig.system.context.fillText(i18n.t("English"), 207, 435);
			ig.system.context.fillText(i18n.t("LevelSettings.narracion"), 725, 285);
			ig.system.context.fillText(i18n.t("LevelSettings.musica"), 725, 365);
			ig.system.context.font = '19pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("LevelSettings.aceptar"), 865, 725);
			ig.system.context.fillText(i18n.t("LevelSettings.cancelar"), 60, 725);
		}
	});

	i18n.init({ resStore: ig.locales, lng: ig.settings.language}, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', HomeGame, 60, 1024, 768,  1);
	});
});
