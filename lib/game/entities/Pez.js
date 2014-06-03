ig.module('game.entities.Pez')
	.requires('impact.entity')
	.defines(function(){
		EntityPez = ig.Entity.extend({
			zIndex: 998,
			origY:0,
			refX:0,
			
			init: function(x,y,settings){
				this.addAnim('idle',1,[0]);
				this.origY=y;
				this.refX=x;
				this.vel.x=-75;
				this.parent(x,y,settings);
			},

			update: function(){
				this.parent();

				var x=this.refX-this.pos.x;
				this.pos.y=this.origY-(100*Math.sin(0.01*x));
				var y=this.origY-this.pos.y;
				this.refX=(y===0?this.pos.x:this.refX);
				
				this.anims.idle.angle=(Math.atan(y/x) || 0.0);

				if(this.pos.x+this.size.x<(ig.game.screen.x+ig.system.realWidth)/2){
					this.pos.x=ig.system.realWidth;
					this.refX=this.pos.x;
					this.origY= Math.floor(Math.random() * (ig.system.realHeight - 400 + 1) + 400);
				}
			}
		});
	});