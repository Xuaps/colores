ig.module('game.entities.Arbol02')
	.requires('game.entities.Arbol')
	.defines(function(){
		EntityArbol02 = EntityArbol.extend({
			name: 'Arbol02',
			size: {x:416, y:401},
			animSheet: new ig.AnimationSheet('media/arbol02_sprite.png',416,401),
		});
	});