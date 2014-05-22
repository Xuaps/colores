ig.module('game.entities.Pez01')
	.requires('game.entities.Pez')
	.defines(function(){
		EntityPez01 = EntityPez.extend({
			name: 'Pez01',
			size: {x:161, y:88},
			animSheet: new ig.AnimationSheet('media/pez01.png',161,88)
		});
	});