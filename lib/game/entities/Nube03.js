ig.module('game.entities.Nube03')
	.requires('game.entities.Nube')
	.defines(function(){
		EntityNube03 = EntityNube.extend({
			name: 'Nube03',
			size: {x:386, y:168},

			animSheet: new ig.AnimationSheet('media/nube03.png',386,168),

			init: function (x,y,settings){
				this.vel.x=-30;
				this.accel.x=-2;
				this.parent(x,y,settings);
			}
		});
	});