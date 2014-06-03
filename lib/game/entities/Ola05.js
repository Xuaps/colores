ig.module('game.entities.Ola05')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla05 = EntityOla.extend({
			name: 'Ola05',
			size: {x:768, y:229},

			animSheet: new ig.AnimationSheet('media/olas05.png',768,229),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});