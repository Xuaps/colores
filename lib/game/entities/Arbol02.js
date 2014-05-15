ig.module('game.entities.Arbol02')
	.requires('impact.entity')
	.defines(function(){
		EntityArbol02 = ig.Entity.extend({
			name: 'Arbol02',
			size: {x:416, y:401},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/arbol01_sprite.png',416,401),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
			}

		});
	});