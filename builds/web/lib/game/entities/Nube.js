ig.module('game.entities.Nube')
	.requires('impact.entity')
	.defines(function(){
		EntityNube = ig.Entity.extend({
			zIndex: 999,

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();

				if(this.pos.x+this.size.x<(ig.game.screen.x+ig.system.realWidth)/2){
					this.pos.x=ig.system.realWidth;
				}
				
			}

		});
	});