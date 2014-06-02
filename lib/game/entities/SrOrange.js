ig.module('game.entities.SrOrange')
	.requires('impact.entity')
	.defines(function(){
		EntitySrOrange = ig.Entity.extend({
			name: 'SrStrawberry',
			size: {x:305, y:301},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_orange.png',305,301),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('tongue',0.2,[1,0],true);
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('click')){
					this.currentAnim=this.anims.tongue.rewind();
				}
			}

		});
	});