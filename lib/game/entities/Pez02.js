ig.module('game.entities.Pez02')
	.requires('game.entities.Pez')
	.defines(function(){
		EntityPez02 = EntityPez.extend({
			name: 'Pez02',
			size: {x:150, y:99},
			animSheet: new ig.AnimationSheet('media/pez02.png',150,99)			
		});
	});