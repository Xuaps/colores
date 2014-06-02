ig.module('game.entities.Nube05')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube05 = EntityNube.extend({
			name: 'Nube05',
			size: {x:228, y:101},

			animSheet: new ig.AnimationSheet('media/nube05.png',228,101),

			init: function (x,y,settings){
				this.vel.x=-33;
				this.parent(x,y,settings);
			}
		});
	});