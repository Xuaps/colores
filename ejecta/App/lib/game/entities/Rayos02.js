ig.module('game.entities.Rayos02')
	.requires('impact.entity')
	.defines(function(){
		EntityRayos02 = ig.Entity.extend({
			name: 'Rayos02',
			size: {x:2824, y:2820},
			zIndex: -10,

			animSheet: new ig.AnimationSheet('media/02_rayos.png',2824,2820),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.currentAnim.angle+=0.0008;
			}

		});
	});