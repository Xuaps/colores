ig.module('game.entities.Nube05')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube05 = EntityNube.extend({
			name: 'Nube05',
			size: {x:456, y:202},

			animSheet: new ig.AnimationSheet('media/nube05.png',456,202)
		});
	});