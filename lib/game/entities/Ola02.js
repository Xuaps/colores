ig.module('game.entities.Ola02')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla02 = EntityOla.extend({
			name: 'Ola02',
			size: {x:768, y:221},

			animSheet: new ig.AnimationSheet('media/olas02.png',768,221),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});