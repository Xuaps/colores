ig.module('game.entities.Next')
	.requires('impact.entity',
		'plugins.button')
	.defines(function(){
		EntityNext = Button.extend({
			name: 'Next',
			size: {x:59, y:59},
			animSheet: new ig.AnimationSheet('media/flecha_derecha.png',59,59)
		});
	});