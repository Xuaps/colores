ig.module(
	'game.main'
)
.requires(
	'impact.debug.debug',
	'impact.game',
	'game.levels.rojo',
	'plugins.touch-button',
	'plugins.check-touch-button',
	'plugins.i18n',
	'plugins.locales',
	'plugins.settings'
)
.defines(function(){

	MyGame = ig.Game.extend({
		volume: 0.2,
		bgtune: new ig.Sound( 'media/background2.*', false ),
		buttons: null,
		buttonNextImage: new ig.Image('media/flecha_derecha.png'),
		buttonBackImage: new ig.Image('media/flecha_izquierda.png'),
		buttonSettingsImage: new ig.Image('media/preferencias_negro.png'),
		levels: [LevelRojo], //, LevelNaranja, LevelAmarillo, LevelGreen, LevelAzul, LevelAnil, LevelVioleta, LevelRespuesta],
		currentLevel: 0,
		narration:null,

		init: function() {
			this.loadLevel(this.levels[this.currentLevel]);
			this.play_narration();

			//var music = ig.music;
			//music.add(this.bgtune);
			//music.volume = this.volume;
			//if(ig.settings.music){
			//	music.play();
			//}

            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'right', {right: 45, bottom: 50}, 30, 30, this.buttonNextImage, 0 ),
                new ig.TouchButton( 'left', {left: 45, bottom: 50}, 30, 30, this.buttonBackImage, 0 ),
                new ig.TouchButton( 'settings', {left: 45, top: 50}, 30, 30, this.buttonSettingsImage, 0 ),
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

			ig.system.context.textAlign = 'center';
			ig.system.context.font = '20pt Garamond-Bold';
			if(this.levels[this.currentLevel].name==="LevelRespuesta"){
				ig.system.context.fillStyle="#000000";
				this.print(i18n.t(this.levels[this.currentLevel].name+".correcto"), 1536, 1152, 30 );
			}else if(this.levels[this.currentLevel].name==="LevelTodos"){

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
		},

		loadLevel: function(data){
			this.parent( data );

			for( var i = 0; i < this.backgroundMaps.length; i++ ) {
				this.backgroundMaps[i].preRender = true;
			}
		}
	});
	
	

	i18n.init({ resStore: ig.locales, lng: ig.settings.language}, function(){
		ig.Sound.use = [ig.Sound.FORMAT.CAF, ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.main( '#canvas', MyGame, 60, 1024, 768,  1);
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		
	});
});
