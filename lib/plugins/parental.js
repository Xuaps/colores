ig.module(
	'plugins.parental'
)
.requires(
	'impact.game',
	'plugins.i18n',
	'plugins.touch-button'
)
.defines(function(){

	ParentalGate = ig.Class.extend({
		image: null,
		action: null,
		savedData: null,
		question:'',
		
		init : function(image){
			this.image = image;
			this.warning = new ig.Sound( 'media/'+i18n.t('ParentalGate.audio' ));

		},

		update : function(){
			if(this.action){
				if(ig.input.pressed('right')){
					this.toExecute = this.action;
				}
				if(ig.input.pressed('wrong') || ig.input.pressed('right')){
					this.action = null;
					ig.system.context.drawImage(this.savedData,0,0);
				}
			}else if(this.toExecute){
				this.toExecute();
				this.toExecute = null;
			}
		},

		draw: function() {
			if(this.action){
				this.image.draw(0,0);

				ig.system.context.fillStyle="#000000";
				ig.system.context.textAlign = 'center';
				ig.system.context.font = '24pt Garamond-Bold';
				this.print(i18n.t("ParentalGate.titulo"), 512, 160,30);
				ig.system.context.font = '19pt Garamond-Bold';
				this.print(i18n.t("ParentalGate.subtitulo"), 512, 240,30);
				ig.system.context.font = '30pt Garamond-Bold';
				this.print(this.question, 512, 370);
				ig.system.context.fillStyle="#FFFFFF";
				var i=0;
				this.buttons.buttons.forEach(function(button){
					if(button.action==='right'){
						ig.system.context.fillText(this.right_result, button.anchor.left+60, button.anchor.top+70);
					}else{
						ig.system.context.fillText(this.random_results[i], button.anchor.left+60, button.anchor.top+70);						
						i++;
					}
				}.bind(this))
				this.buttons.draw();
			}
		},

		askPermissionFor: function(action){
			if(!this.action){
				this.savedData = new Image();
				this.buttons = new ig.TouchButtonCollection([
					new ig.TouchButton('wrong', {left:150, top: 453}, 120, 120),
					new ig.TouchButton('wrong', {left:300, top: 453}, 120, 120),
					new ig.TouchButton('wrong', {left:450, top: 453}, 120, 120),
					new ig.TouchButton('wrong', {left:600, top: 453}, 120, 120),
					new ig.TouchButton('wrong', {left:750, top: 453}, 120, 120),
				]);
				this.buttons.align();

				this.savedData.src = ig.system.canvas.toDataURL("image/png");
				this.generateQuestion();
				this.action = action;
				this.warning.play();
			}
		},

		isAskingForPermission: function(){
			return this.action!==null;
		},

		print:function(sentences, posX, posY, increment){
			sentences.split('\n').forEach(function(sentence){
				ig.system.context.fillText(sentence, posX, posY);
				posY+=increment;
			});
		},

		generateQuestion: function(){
			var first_number = Math.floor((Math.random()*7)+2);
			var second_number = Math.floor((Math.random()*7)+2);
			
			this.random_results = [];
			this.random_results[0] = Math.floor((Math.random()*99)+1);
			this.random_results[1] = Math.floor((Math.random()*99)+1);
			this.random_results[2] = Math.floor((Math.random()*99)+1);
			this.random_results[3] = Math.floor((Math.random()*99)+1);

			
			this.right_result=first_number * second_number;
			this.buttons.buttons[Math.floor((Math.random()*5))].action = 'right';
			this.question = first_number +'   x   '+second_number;
		}
	});
});