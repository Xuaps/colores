ig.module('game.entities.Strawberry01')
	.requires('impact.entity',
		'game.entities.Strawberry')
	.defines(function(){
		EntityStrawberry01 = EntityStrawberry.extend({
			name: 'Strawberry01',
			size: {x:129, y:175},
			animSheet: new ig.AnimationSheet('media/fresa01.png',129,175)
		});
	});