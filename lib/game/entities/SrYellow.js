ig.module('game.entities.SrYellow')
	.requires('impact.entity','plugins.touch-button')
	.defines(function(){
		EntitySrYellow = ig.Entity.extend({
			name: 'SrYellow',
			size: {x:190, y:363},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_yellow.jpg',190,363),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('wave',0.041,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0], true);
				
				this.parent(x,y,settings);

				var buttons=new ig.TouchButtonCollection([
					new ig.TouchButton( 'wave', {left:this.pos.x, top:this.pos.y}, this.size.x, this.size.y ),
				]);
				
				buttons.align();
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('wave')){
					this.currentAnim=this.anims.wave.rewind();
				}
			}
		});
	});