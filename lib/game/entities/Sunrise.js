ig.module('game.entities.Sunrise')
	.requires('impact.entity')
	.defines(function(){
		EntitySunrise = ig.Entity.extend({
			name: 'Sunrise',
			size: {x:1000, y:1000},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sunrise.jpg',1000,1000),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.anims.idle.angle+=0.006;
				this.parent();
			}
		});
	});