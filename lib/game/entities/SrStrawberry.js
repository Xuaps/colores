ig.module('game.entities.SrStrawberry')
	.requires('impact.entity')
	.defines(function(){
		EntitySrStrawberry = ig.Entity.extend({
			name: 'SrStrawberry',
			size: {x:401, y:611},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_strawberry.png',401,611),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('blink',1,[0,0,0,0,0,0,0,1]);
				this.parent(x,y,settings);
			},

			update: function(){
				if(this.currentAnim===this.anims.idle){
					this.currentAnim=this.anims.blink.rewind();
				}
				this.parent();
			}
		});
	});