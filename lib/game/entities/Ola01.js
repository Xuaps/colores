ig.module('game.entities.Ola01')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla01 = EntityOla.extend({
			name: 'Ola01',
			size: {x:1572, y:489},

			animSheet: new ig.AnimationSheet('media/olas01.png',1572,489),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});