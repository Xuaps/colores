ig.module('game.entities.SrStrawberry')
	.requires('impact.entity')
	.defines(function(){
		EntitySrStrawberry = ig.Entity.extend({
			name: 'SrStrawberry',
			size: {x:401, y:611},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_strawberry.png',401,611),

			init: function(x,y,settings){
				ig.input.bind( ig.KEY.MOUSE1, 'click' );
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