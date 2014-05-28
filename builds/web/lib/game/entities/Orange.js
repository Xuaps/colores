ig.module('game.entities.Orange')
	.requires('impact.entity')
	.defines(function(){
		EntityOrange = ig.Entity.extend({
			zIndex: 999,

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