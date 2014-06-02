ig.module('game.entities.Nube02')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube02 = EntityNube.extend({
			name: 'Nube02',
			size: {x:193, y:80},

			animSheet: new ig.AnimationSheet('media/nube02.png',193,80),

			init: function (x,y,settings){
				this.vel.x=-45;
				this.parent(x,y,settings);
			}
		});
	});