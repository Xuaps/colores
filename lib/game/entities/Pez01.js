ig.module('game.entities.Pez01')
	.requires('game.entities.Pez')
	.defines(function(){
		EntityPez01 = EntityPez.extend({
			name: 'Pez01',
			size: {x:81, y:44},
			animSheet: new ig.AnimationSheet('media/pez01.png',81,44)
		});
	});