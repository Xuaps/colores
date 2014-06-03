ig.module('game.entities.Ola06')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla06 = EntityOla.extend({
			name: 'Ola06',
			size: {x:785, y:204},

			animSheet: new ig.AnimationSheet('media/olas06.png',785,204),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});