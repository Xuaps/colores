ig.module('game.entities.SrBlue')
	.requires('impact.entity','plugins.touch-button')
	.defines(function(){
		EntitySrBlue = ig.Entity.extend({
			name: 'SrBlue',
			size: {x:185, y:243},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_blue.png',185,243),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('pointing',0.041,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0,
					1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,23,0], true);
				this.parent(x,y,settings);

				var buttons=new ig.TouchButtonCollection([
					new ig.TouchButton( 'ponting', {left:this.pos.x, top:this.pos.y}, this.size.x, this.size.y ),
				]);
				
				buttons.align();
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('ponting')){
					this.currentAnim=this.anims.pointing.rewind();
				}
			}
		});
	});