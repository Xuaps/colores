ig.module('game.entities.Ola02')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla02 = EntityOla.extend({
			name: 'Ola02',
			size: {x:1572, y:489},

			animSheet: new ig.AnimationSheet('media/olas02.png',1572,489),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});