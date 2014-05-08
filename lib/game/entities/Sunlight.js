ig.module('game.entities.Sunlight')
	.requires('impact.entity')
	.defines(function(){
		EntitySunlight = ig.Entity.extend({
			name: 'Sunlight',
			size: {x:1000, y:1000},
			zIndex: 999,

			animSheet: new ig.AnimationSheet('media/sunlight.png',1000,1000),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.anims.idle.angle-=0.002;
				this.parent();
			}
		});
	});