ig.module('game.entities.Question')
	.requires('impact.entity')
	.defines(function(){
		EntityQuestion = ig.Entity.extend({
			name: 'Question',
			size: {x:296, y:549},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/interrogante.png',296,549),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('smile',0.2,[1,0],true);
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('click')){
					this.currentAnim=this.anims.smile.rewind();
				}
			}

		});
	});