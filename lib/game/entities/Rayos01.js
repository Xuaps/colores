ig.module('game.entities.Rayos01')
	.requires('impact.entity')
	.defines(function(){
		EntityRayos01 = ig.Entity.extend({
			name: 'Rayos01',
			size: {x:2824, y:2820},
			zIndex: -10,

			animSheet: new ig.AnimationSheet('media/01_rayos.png',2824,2820),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			}

		});
	});