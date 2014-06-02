ig.module('game.entities.Arbol01')
	.requires('game.entities.Arbol')
	.defines(function(){
		EntityArbol01 = EntityArbol.extend({
			name: 'Arbol01',
			size: {x:208, y:201},

			animSheet: new ig.AnimationSheet('media/arbol01_sprite.png',208,201),
		});
	});