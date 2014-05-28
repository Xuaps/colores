ig.module('game.entities.Strawberry')
	.requires('impact.entity')
	.defines(function(){
		EntityStrawberry = ig.Entity.extend({
			zIndex: 999,

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				if(this.pos.y>ig.game.screen.y+ig.system.realHeight){
					this.pos.y=-376;
				}
				this.pos.y+=1;
				this.currentAnim.angle+=0.02;
				this.parent();
			}
		});
	});