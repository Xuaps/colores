ig.module('game.entities.Strawberry')
	.requires('impact.entity')
	.defines(function(){
		EntityStrawberry = ig.Entity.extend({
			name: 'Strawberry',
			size: {x:180, y:240},
			zIndex: 999,
			down:1,

			animSheet: new ig.AnimationSheet('media/Strawberry.png',180,240),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);

				this.parent(x,y,settings);
			},

			update: function(){
				if(this.down && this.pos.y<ig.game.screen.y+768){
					this.pos.y+=0.5;	
					this.down=1;
				}else{
					this.pos.y-=0.5;
					this.down=0;
				}
				
				this.anims.idle.angle+=0.01;
				this.parent();
			}
		});
	});