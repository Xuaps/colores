ig.module('game.entities.Strawberry03')
	.requires('impact.entity',
		'game.entities.Strawberry')
	.defines(function(){
		EntityStrawberry03 = EntityStrawberry.extend({
			name: 'Strawberry03',
			size: {x:220, y:186},
			animSheet: new ig.AnimationSheet('media/fresa03.png',220,186)
		});
	});