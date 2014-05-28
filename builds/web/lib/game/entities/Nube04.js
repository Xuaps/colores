ig.module('game.entities.Nube04')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube04 = EntityNube.extend({
			name: 'Nube04',
			size: {x:507, y:236},

			animSheet: new ig.AnimationSheet('media/nube04.png',507,236),

			init: function (x,y,settings){
				this.vel.x=-37;
				this.parent(x,y,settings);
			}
		});
	});