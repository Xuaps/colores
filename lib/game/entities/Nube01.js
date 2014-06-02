ig.module('game.entities.Nube01')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube01 = EntityNube.extend({
			name: 'Nube01',
			size: {x:184, y:82},

			animSheet: new ig.AnimationSheet('media/nube01.png',184,82),

			init: function (x,y,settings){
				this.vel.x=-50;
				this.parent(x,y,settings);
			}
		});
	});