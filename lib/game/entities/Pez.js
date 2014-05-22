ig.module('game.entities.Pez')
	.requires('impact.entity')
	.defines(function(){
		EntityPez = ig.Entity.extend({
			zIndex: 999,
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();
			}
		});
	});