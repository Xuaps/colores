ig.module('game.entities.SrGreen')
	.requires('impact.entity')
	.defines(function(){
		EntitySrGreen = ig.Entity.extend({
			name: 'SrGreen',
			size: {x:616, y:762},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_green.png',616,762),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('blink',0.1,[1,0],true);
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('click')){
					this.currentAnim=this.anims.blink.rewind();
				}

			}

		});
	});