ig.module('game.entities.Ola04')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla04 = EntityOla.extend({
			name: 'Ola04',
			size: {x:768, y:195},

			animSheet: new ig.AnimationSheet('media/olas04.png',768,195),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.origX=x;
				this.parent(x,y,settings);
			},
		});
	});