ig.module('game.entities.Back')
	.requires('impact.entity',
		'plugins.button')
	.defines(function(){
		EntityBack = Button.extend({
			name: 'Back',
			size: {x:59, y:59},
			animSheet: new ig.AnimationSheet('media/flecha_izquierda.png',59,59)
		});
	});