ig.module('game.entities.Pez02')
	.requires('game.entities.Pez')
	.defines(function(){
		EntityPez02 = EntityPez.extend({
			name: 'Pez02',
			size: {x:75, y:50},
			animSheet: new ig.AnimationSheet('media/pez02.png',75,50)
		});
	});