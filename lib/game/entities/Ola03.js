ig.module('game.entities.Ola03')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla03 = EntityOla.extend({
			name: 'Ola03',
			size: {x:768, y:220},

			animSheet: new ig.AnimationSheet('media/olas03.png',768,220),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});