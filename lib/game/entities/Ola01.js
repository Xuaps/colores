ig.module('game.entities.Ola01')
	.requires('game.entities.Ola')
	.defines(function(){
		EntityOla01 = EntityOla.extend({
			name: 'Ola01',
			size: {x:1572, y:489},

			animSheet: new ig.AnimationSheet('media/olas01.png',1572,489),
		});
	});