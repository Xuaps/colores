ig.module('game.entities.Strawberry')
	.requires('impact.entity')
	.defines(function(){
		EntityStrawberry = ig.Entity.extend({
			name: 'Strawberry',
			zIndex: 999,
			size: {x:258, y:349},
			animSheet: new ig.AnimationSheet('media/fresa01.png',258,349),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.parent(x,y,settings);
			},

			update: function(){
				if(this.pos.y>ig.game.screen.y+ig.system.realHeight){
					this.pos.y=-200;
				}
				this.pos.y+=1;
				this.currentAnim.angle+=0.02;
				this.parent();
			}
		});
	});