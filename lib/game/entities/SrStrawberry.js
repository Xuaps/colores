ig.module('game.entities.SrStrawberry')
	.requires('impact.entity','plugins.touch-button')
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

				var buttons=new ig.TouchButtonCollection([
					new ig.TouchButton( 'blink', {left:this.pos.x, top:this.pos.y}, this.size.x, this.size.y ),
				]);
				
				buttons.align();
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('blink')){
					this.currentAnim=this.anims.blink.rewind();
				}
			}
		});
	});