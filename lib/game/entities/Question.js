ig.module('game.entities.Question')
	.requires('impact.entity','plugins.touch-button')
	.defines(function(){
		EntityQuestion = ig.Entity.extend({
			name: 'Question',
			size: {x:296, y:549},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/interrogante.jpg',296,549),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.addAnim('smile',0.2,[1,0],true);
				this.parent(x,y,settings);

				var buttons=new ig.TouchButtonCollection([
					new ig.TouchButton( 'smile', {left:this.pos.x, top:this.pos.y}, this.size.x, this.size.y ),
				]);
				
				buttons.align();
			},

			update: function(){
				this.parent();
				if(ig.input.pressed('smile')){
					this.currentAnim=this.anims.smile.rewind();
				}
			}

		});
	});