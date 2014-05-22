ig.module('game.entities.Nube02')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube02 = EntityNube.extend({
			name: 'Nube02',
			size: {x:387, y:160},

			animSheet: new ig.AnimationSheet('media/nube02.png',387,160)
		});
	});