ig.module('game.entities.Ola06')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla06 = EntityOla.extend({
			name: 'Ola06',
			size: {x:1570, y:407},

			animSheet: new ig.AnimationSheet('media/olas06.png',1570,407),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});