ig.module('game.entities.White')
	.requires('impact.entity')
	.defines(function(){
		EntityWhite = ig.Entity.extend({
			name: 'White',
			size: {x:256, y:256},
			zIndex: 0,

			animSheet: new ig.AnimationSheet('media/blanco.png',256,256),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			}

		});
	});