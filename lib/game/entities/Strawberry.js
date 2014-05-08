ig.module('game.entities.Strawberry')
	.requires('impact.entity')
	.defines(function(){
		EntityStrawberry = ig.Entity.extend({
			name: 'Strawberry',
			size: {x:180, y:240},
			zIndex: 999,
			down:1,
			vel: {x: 60, y: 11},
        	maxVel: {x: 44, y: 44},


			animSheet: new ig.AnimationSheet('media/Strawberry.png',180,240),

			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            	this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
				this.parent(x,y,settings);
			},

			update: function(){
				 if( this.pos.y > ig.game.screen.y  + ig.system.height ) {
	                // move it to the top screen
	               this.pos.y = ig.game.screen.y - 0;
	            }
	            // out of right bound
	            if(this.pos.x > ig.game.screen.x + ig.system.width){
	                this.pos.x = ig.game.screen.x;
	            }
	            // out of left bound
	            if(this.pos.x < ig.game.screen.x){
	                this.pos.x = ig.game.screen.x + ig.system.width;
	            }
/*            
				if(this.down && this.pos.y<ig.game.screen.y+768){
					this.pos.y+=0.5;	
				}else{
					this.pos.y-=0.5;
					this.down=0;
				}*/
				
				this.anims.idle.angle+=0.01;
				this.parent();
			},
			
	        handleMovementTrace: function(res){
	            this.pos.x += this.vel.x * ig.system.tick;
	            this.pos.y += this.vel.y * ig.system.tick;
	        }
		});
	});