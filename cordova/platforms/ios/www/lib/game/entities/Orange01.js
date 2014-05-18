ig.module('game.entities.Orange01')
	.requires('impact.entity',
		'game.entities.Orange')
	.defines(function(){
		EntityOrange01 = EntityOrange.extend({
			name: 'Orange01',
			size: {x:544, y:512},
			animSheet: new ig.AnimationSheet('media/naranja_01.png',544,512)
		});
	});