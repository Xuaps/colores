ig.module('game.entities.Strawberry01')
	.requires('impact.entity',
		'game.entities.Strawberry')
	.defines(function(){
		EntityStrawberry01 = EntityStrawberry.extend({
			name: 'Strawberry01',
			size: {x:258, y:349},
			animSheet: new ig.AnimationSheet('media/fresa01.png',258,349)
		});
	});