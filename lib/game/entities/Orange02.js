ig.module('game.entities.Orange02')
	.requires('impact.entity',
		'game.entities.Orange')
	.defines(function(){
		EntityOrange02 = EntityOrange.extend({
			name: 'Orange02',
			size: {x:291, y:273},
			animSheet: new ig.AnimationSheet('media/naranja_02.png',291,273)
		});
	});