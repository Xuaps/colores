ig.module('game.entities.Pez01')
	.requires('impact.entity')
	.defines(function(){
		EntityPez01 = ig.Entity.extend({
			zIndex: 999,
			name: 'Pez01',
			size: {x:161, y:88},
			animSheet: new ig.AnimationSheet('media/pez01.png',161,88),
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.currentAnim.angle+=0.01;
				this.parent();
			}
		});
	});