ig.module('game.entities.Ola05')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla05 = EntityOla.extend({
			name: 'Ola05',
			size: {x:1572, y:545},

			animSheet: new ig.AnimationSheet('media/olas05.png',1572,545),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});