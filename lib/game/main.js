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
	'game.levels.creditos',
	'plugins.touch-button',
	'plugins.check-touch-button',
	'plugins.i18n',
	'plugins.locales',
	'plugins.settings',
	'plugins.whiteboard',
	'plugins.parental',
	'plugins.game_history',
	'plugins.impact-splash-loader'
)
.defines(function(){
	HomeGame = ig.Game.extend({
		volume: 0.2,
		bgtune: new ig.Sound( 'media/background.*', false ),
		buttons: null,
		buttonSettingsImage: new ig.Image('media/preferencias_blanco.png'),
		buttonInfoImage: new ig.Image('media/informacion.png'),
		buttonStartImage: new ig.Image('media/flecha_derecha.png'),
		buttonPaintImage: new ig.Image('media/boton_dibujar_blanco.png'),

		init: function() {
			this.loadLevel(LevelHome);

			var music = ig.music;
			music.add(this.bgtune);
			music.volume = this.volume;
			if(ig.settings.music){
				music.play();
			}

            this.buttons = new ig.TouchButtonCollection([
				new ig.TouchButton( 'start', {right: 45, bottom: 50}, 40, 40, this.buttonStartImage, 0 ),
				new ig.TouchButton( 'info', {left: 45, bottom: 50}, 40, 40, this.buttonInfoImage, 0 ),
				new ig.TouchButton( 'settings', {left: 45, top: 50}, 40, 40, this.buttonSettingsImage, 0 ),
				new ig.TouchButton( 'paint', {right: 45, top: 50}, 40, 40, this.buttonPaintImage, 0 ),
            ]);
            
            this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('settings')){
				ig.system.setGame(SettingsGame);
			}else if(ig.input.pressed('start')){
				ig.system.setGame(StoryGame);
			}else if(ig.input.pressed('paint')){
				ig.system.setGame(PaintGame);
			}else if(ig.input.pressed('info')){
				ig.system.setGame(CreditsGame);
			}
		},
		
		draw: function() {
			this.parent();
			
			this.buttons.draw();

			this.buttons.draw();
			ig.system.context.fillStyle="#000000";
			ig.system.context.textAlign = 'center';
			ig.system.context.font = '30pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Home.titulo"), 512, 360);
			ig.system.context.font = '19pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Home.subtitulo"), 512, 395);
			ig.system.context.fillStyle="#FFFFFF";
			ig.system.context.textAlign = 'left';
			ig.system.context.fillText(i18n.t("Home.prefrencias"), 90, 80);
			ig.system.context.fillText(i18n.t("Home.info"), 90, 705);
			ig.system.context.textAlign = 'right';
			ig.system.context.fillText(i18n.t("Home.comenzar"), 930, 705);
			ig.system.context.fillText(i18n.t("dibujar"), 930, 80);
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
		whiteButtonBackImage: new ig.Image('media/flecha_izquierda_blanca.png'),
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		buttonWhiteSettingsImage: new ig.Image('media/preferencias_blanco.png'),
		buttonRestartImage: new ig.Image('media/boton_reiniciar_negro.png'),
		buttonPaintSettingsImage: new ig.Image('media/boton_dibujar_negro.png'),
		levels: [LevelRojo, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul, LevelAnil, LevelVioleta, LevelTodos, LevelRespuesta],
		currentLevel: 0,
		narration:null,

		init: function() {
			if(ig.system.storyGameLevel){
				this.currentLevel=ig.system.storyGameLevel;
				delete ig.system.storyGameLevel;
			}
			this.loadLevel(this.levels[this.currentLevel]);
			this.play_narration();

            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'right', {right: 45, bottom: 50}, 40, 40, this.buttonNextImage, 0 ),
                new ig.TouchButton( 'left', {left: 45, bottom: 50}, 40, 40, this.buttonBackImage, 0 ),
                new ig.TouchButton( 'settings', {left: 45, top: 50}, 40, 40, this.buttonSettingsImage, 0 ),
                new ig.TouchButton( 'paint', {right: 45, top: 50}, 40, 40, this.buttonPaintSettingsImage, 0 ),
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
			}else if(this.currentLevel===0 && ig.input.pressed('left')){
				if(this.narration)
					this.narration.stop();
				ig.system.setGame(HomeGame);
			}else if(ig.input.pressed('settings')){
				if(this.narration)
					this.narration.stop();
				ig.system.storyGameLevel=this.currentLevel;
				ig.system.setGame(SettingsGame);
			}else if(this.currentLevel===this.levels.length-1 && ig.input.pressed('paint')){
				if(this.narration)
					this.narration.stop();
				ig.system.setGame(PaintGame);
			}else if(this.currentLevel===this.levels.length-1 && ig.input.pressed('right')){
				if(this.narration)
					this.narration.stop();
				ig.system.setGame(HomeGame);
			}
		},
		
		draw: function() {
			
			this.parent();
			
			if(this.currentLevel<this.levels.length-1){
				if(this.levels[this.currentLevel].name==="LevelTodos"){
					this.buttons.buttons[0].image=this.blackButtonNextImage;
				}else{
					this.buttons.buttons[0].image=this.buttonNextImage;
				}
			}else{
				this.buttons.buttons[0].image=this.buttonRestartImage;
				this.buttons.buttons[3].draw();
			}
			this.buttons.buttons[0].draw();

			if(this.levels[this.currentLevel].name==="LevelTodos"){
				this.buttons.buttons[2].image=this.buttonWhiteSettingsImage;
				this.buttons.buttons[1].image=this.whiteButtonBackImage;
				this.buttons.buttons[2].draw();
				this.buttons.buttons[1].draw();
			}else{
				this.buttons.buttons[2].image=this.buttonSettingsImage;
				this.buttons.buttons[1].image=this.buttonBackImage;
				this.buttons.buttons[2].draw();
				this.buttons.buttons[1].draw();
			}

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
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		buttonTwitterImage: new ig.Image('media/twitter.png'),
		buttonFacebookImage: new ig.Image('media/facebook.png'),
		buttonRedImage: new ig.Image('media/01_boton_rojo.png'),
		buttonOrangeImage: new ig.Image('media/02_boton_naranja.png'),
		buttonYellowImage: new ig.Image('media/03_boton_amarillo.png'),
		buttonGreenImage: new ig.Image('media/04_boton_verde.png'),
		buttonBlueImage: new ig.Image('media/05_boton_azul.png'),
		buttonIndigoImage: new ig.Image('media/06_boton_anil.png'),
		buttonVioletImage: new ig.Image('media/07_boton_violeta.png'),
		buttonEraserImage: new ig.Image('media/08_boton_goma.png'),
		buttonCleanImage: new ig.Image('media/09_boton_papelera.png'),
		buttonRestartImage: new ig.Image('media/flecha_izquierda.png'),
		buttons:null,
		whiteboard:null,
		clearColor: '#FFFFFF',
		
		init: function(){
			this.loadLevel(LevelJuego);


			var red=new ig.CheckTouchButton( "red", {left:130, bottom: 12}, 92, 92, this.buttonRedImage,1,0,true);
			var orange=new ig.CheckTouchButton( "orange", {left:222, bottom: 12}, 92, 92, this.buttonOrangeImage,1,0,false);
			var yellow=new ig.CheckTouchButton( "yellow", {left:314, bottom: 12}, 92, 92, this.buttonYellowImage,1,0,false);
			var green=new ig.CheckTouchButton( "green", {left:406, bottom: 12}, 92, 92, this.buttonGreenImage,1,0,false);
			var blue=new ig.CheckTouchButton( "blue", {left:498, bottom: 12}, 92, 92, this.buttonBlueImage,1,0,false);
			var indigo=new ig.CheckTouchButton( "indigo", {left:590, bottom: 12}, 92, 92, this.buttonIndigoImage,1,0,false);
			var violet=new ig.CheckTouchButton( "violet", {left:682, bottom: 12}, 92, 92, this.buttonVioletImage,1,0,false);
			var eraser=new ig.CheckTouchButton( "eraser", {left:774, bottom: 12}, 92, 92, this.buttonEraserImage,1,0,false);


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
                new ig.TouchButton( 'home', {left: 45, bottom: 50}, 40, 40, this.buttonRestartImage, 0 ),
                new ig.TouchButton( 'settings', {left: 45, top: 30}, 40, 40, this.buttonSettingsImage, 0 ),
                new ig.TouchButton( 'twitter', {right: 45, top: 30}, 40, 40, this.buttonTwitterImage, 0 ),
                new ig.TouchButton( 'facebook', {right: 100, top: 30}, 40, 40, this.buttonFacebookImage, 0 ),
                new ig.TouchButton( "clean", {left:866, bottom: 12}, 92, 92, this.buttonCleanImage,0)
			]);

			this.buttons.align();
            this.whiteboard=new WhiteBoard(70,90,915, 560);
            this.whiteboard.curColor="#FF0000";
		},

		update: function(){
			var social;

			this.parent();

			if(this.currentLevel!==0 && ig.input.pressed('home') && !gate.isAskingForPermission()){
				ig.system.setGame(HomeGame);
			}else if(ig.input.pressed('settings') && !gate.isAskingForPermission()){
				ig.system.setGame(SettingsGame);
			}else if(ig.input.pressed('clean') && !gate.isAskingForPermission()){
				this.clearColor='#FFFFFF';
			}else if(ig.input.pressed('twitter')){
				if(window.Ejecta){
					gate.askPermissionFor(function(){
						social=new Ejecta.Social();
						social.gameWidth=ig.system.realWidth;
						social.gameHeight=ig.system.realHeight;
						social.post('twitter', '#colores', 'http://xuaps.com/products/colours/', null);
					});
				}
			}else if(ig.input.pressed('facebook')){
				if(window.Ejecta){
					gate.askPermissionFor(function(){
						social=new Ejecta.Social();
						social.gameWidth=ig.system.realWidth;
						social.gameHeight=ig.system.realHeight;
						social.post('facebook', '#colores', 'http://xuaps.com/products/colours/', null);
					});
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

			gate.update();
		},

		draw: function(){
			this.parent();
			this.buttons.buttons[0].draw();
			this.buttons.buttons[1].draw();
			this.buttons.buttons[2].draw();
			this.buttons.buttons[3].draw();
			this.buttons.buttons[4].draw();
			this.buttons.buttons[5].draw();
			this.buttons.buttons[6].draw();
			this.buttons.buttons[7].draw();
			this.buttons.buttons[8].draw();
			this.buttons.buttons[9].draw();
			this.buttons.buttons[12].draw();

			if(this.clearColor!==''){
				this.clearColor= '';
			}

			ig.system.context.fillStyle="#000000";
			ig.system.context.textAlign = 'left';
			ig.system.context.font = '19pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Juego.titulo"), 90, 60);
			ig.system.context.textAlign = 'right';
			if(window.Ejecta){
				var social=new Ejecta.Social();
				if(social.isSupported){
					this.buttons.buttons[10].draw();
					this.buttons.buttons[11].draw();
					ig.system.context.fillText(i18n.t("Juego.compartir"), 860, 60);
				}
			}
			//ig.system.context.fillText(i18n.t("inicio"), 935, 705);

			gate.draw();
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
			var gl=new ig.CheckTouchButton( i18n.languages.galician, {left:150, top: 255}, 40, 40, this.buttonCheckImage,0,1,i18n.languages.galician===ig.settings.language);
			var es=new ig.CheckTouchButton( i18n.languages.spanish, {left:150, top: 335}, 40, 40, this.buttonCheckImage,0,1,i18n.languages.spanish===ig.settings.language);
			var en=new ig.CheckTouchButton( i18n.languages.english, {left:150, top: 405}, 40, 40, this.buttonCheckImage,0,1, i18n.languages.english===ig.settings.language);

			gl.related_buttons=[es,en];
			es.related_buttons=[en,gl];
			en.related_buttons=[gl,es];
			this.buttons = new ig.TouchButtonCollection([
				gl,es,en,
				new ig.CheckTouchButton( 'narracion', {left:670, top: 255}, 40, 40, this.buttonCheckImage,0,1,ig.settings.narration ),
				new ig.CheckTouchButton( 'musica', {left:670, top: 335}, 40, 40, this.buttonCheckImage,0,1,ig.settings.music ),
				new ig.TouchButton( 'aceptar', {right:45, bottom: 50}, 40, 40, this.buttonOkImage,0)
				]);

			this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('aceptar')){
				ig.settings.save();
				ig.system.setGame(this.referrer);
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
			ig.system.context.textAlign = 'right';
			ig.system.context.fillText(i18n.t("LevelSettings.aceptar"), 920, 705);
		}
	});

	CreditsGame = ig.Game.extend({
		buttonOkImage: new ig.Image('media/aceptar.png'),
		buttonWWWImage: new ig.Image('media/www.png'),
		buttonMailImage: new ig.Image('media/mail.png'),
		buttonTwitterImage: new ig.Image('media/twitter_blanco.png'),
		buttonMusicaImage: new ig.Image('media/musica.png'),

		init: function(){
			this.loadLevel(LevelCreditos);
			this.buttons = new ig.TouchButtonCollection([
					new ig.TouchButton( 'aceptar', {right:45, bottom: 50}, 40, 40, this.buttonOkImage,0),
					new ig.TouchButton('www_david', {left:100, top: 370}, 40, 40, this.buttonWWWImage,0),
					new ig.TouchButton('mail_david', {left:145, top: 370}, 40, 40, this.buttonMailImage,0),
					new ig.TouchButton('twitter_david', {left:190, top: 370}, 40, 40, this.buttonTwitterImage,0),
					new ig.TouchButton('www_carlos', {left:380, top: 370}, 40, 40, this.buttonWWWImage,0),
					new ig.TouchButton('mail_carlos', {left:425, top: 370}, 40, 40, this.buttonMailImage,0),
					new ig.TouchButton('twitter_carlos', {left:470, top: 370}, 40, 40, this.buttonTwitterImage,0),
					new ig.TouchButton('www_irene', {left:748, top: 370}, 40, 40, this.buttonWWWImage,0),
					new ig.TouchButton('mail_irene', {left:793, top: 370}, 40, 40, this.buttonMailImage,0),
					new ig.TouchButton('www_musica', {left:100, top: 470}, 40, 40, this.buttonMusicaImage, 0),
				]);

			this.buttons.align();
		},

		update: function(){
			this.parent();
			if(ig.input.pressed('aceptar')){
				ig.system.setGame(HomeGame);
			}else if(ig.input.pressed('www_musica')){
				gate.askPermissionFor(function(){
					this.openUrl('http://www.jamendo.com/es/track/1128590/ally-calvine-ukulele-fun');
				}.bind(this));
			}else if(ig.input.pressed('www_david')){
				gate.askPermissionFor(function(){
					this.openUrl('http://www.xuaps.com');
				}.bind(this));
			}else if(ig.input.pressed('mail_david')){
				gate.askPermissionFor(function(){
					this.openUrl('mailto:tales@xuaps.com');
				}.bind(this));
			}else if(ig.input.pressed('twitter_david')){
				gate.askPermissionFor(function(){
					this.openUrl('http://twitter.com/xuapslabs');
				}.bind(this));
			}else if(ig.input.pressed('www_carlos')){
				gate.askPermissionFor(function(){
					this.openUrl('http://comendador.es/ilustracion');
				}.bind(this));
			}else if(ig.input.pressed('mail_carlos')){
				gate.askPermissionFor(function(){
					this.openUrl('mailto:carlos@comendador.es');
				}.bind(this));
			}else if(ig.input.pressed('twitter_carlos')){
				gate.askPermissionFor(function(){
					this.openUrl('https://twitter.com/ccomendador');
				}.bind(this));
			}else if(ig.input.pressed('www_irene')){
				gate.askPermissionFor(function(){
					this.openUrl('http://www.entrelinguas.eu');
				}.bind(this));
			}else if(ig.input.pressed('mail_irene')){
				gate.askPermissionFor(function(){
					this.openUrl('mailto:irene@entrelinguas.eu');
				}.bind(this));
			}
			gate.update();
		},

		draw: function(){
			this.parent();
			this.buttons.draw();
			ig.system.context.fillStyle="#FFFFFF";
			ig.system.context.textAlign = 'center';
			ig.system.context.font = '30pt Garamond-Bold';
			ig.system.context.fillText(i18n.t("Home.info"), 512, 75);
			
			ig.system.context.font = '24pt Garamond-Bold';
			ig.system.context.textAlign = 'left';
			ig.system.context.fillText("David Vílchez", 100, 185);
			ig.system.context.fillText("Carlos Comendador", 380, 185);
			ig.system.context.fillText("Irene Doval", 748, 185);
			
			ig.system.context.font = '19pt Garamond-Bold';
			this.print(i18n.t("david"), 100, 285, 30);
			this.print(i18n.t("carlos"), 380, 285, 30);
			this.print(i18n.t("irene"), 748, 285, 30);
			this.print(i18n.t("musica"), 145, 500, 30);

			ig.system.context.textAlign = 'right';
			ig.system.context.fillText(i18n.t("LevelSettings.aceptar"), 920, 705);

			gate.draw();

		},

		print:function(sentences, posX, posY, increment){
			sentences.split('\n').forEach(function(sentence){
				ig.system.context.fillText(sentence, posX, posY);
				posY+=increment;
			});
		},

		openUrl: function(url){
			if(window.ejecta){
				ejecta.openURL(url);
			}else{
				window.location.href=url;
			}
		}
	});

	var gate;
	i18n.init({ resStore: ig.locales, lng: ig.settings.language}, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];

		
		var canvas = ig.$('#canvas');
		
		var width = 1024;
		var scale = window.innerWidth / width;
		var height = window.innerHeight / scale;

		//scaling canvas
		canvas.style.width = window.innerWidth + "px";
		canvas.style.height = window.innerHeight + "px";

		ig.main( '#canvas', HomeGame, 60, width, height,  1, ig.ImpactSplashLoader);
		gate = new ParentalGate();
	});
});
