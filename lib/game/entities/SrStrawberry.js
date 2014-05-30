ig.module('game.entities.SrStrawberry')
	.requires('impact.entity')
	.defines(function(){
		EntitySrStrawberry = ig.Entity.extend({
			name: 'SrStrawberry',
			size: {x:200, y:305},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_strawberry.png',200,305),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('blink',0.2,[1,0], true);
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