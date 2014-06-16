ig.module('game.entities.SrGreen')
	.requires('impact.entity','plugins.touch-button')
	.defines(function(){
		EntitySrGreen = ig.Entity.extend({
			name: 'SrGreen',
			size: {x:308, y:381},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sr_green.jpg',308,381),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('blink',0.1,[1,0],true);
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