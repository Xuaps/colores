ig.module('game.entities.Rayos02')
	.requires('impact.entity')
	.defines(function(){
		EntityRayos02 = ig.Entity.extend({
			name: 'Rayos02',
			size: {x:1412, y:1410},
			zIndex: -10,

			animSheet: new ig.AnimationSheet('media/02_rayos.png',1412,1410),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.currentAnim.angle+=0.0008;
			}

		});
	});