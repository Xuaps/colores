ig.module('game.entities.Strawberry02')
	.requires('impact.entity',
		'game.entities.Strawberry')
	.defines(function(){
		EntityStrawberry02 = EntityStrawberry.extend({
			name: 'Strawberry02',
			size: {x:178, y:141},
			animSheet: new ig.AnimationSheet('media/fresa02.png',178,141)
		});
	});